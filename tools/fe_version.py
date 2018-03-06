# -*- coding: utf-8 -*-

import hashlib
import os
import os.path
import sys
import re


def sync_fe_files(dist, static, template):
    """
    用于维护前端文件在html中的版本信息。

    该方法接受三个参数:

    * dist: 最新的前端文件的路径
    * static: 静态文件路径
    * template: html文件路径

    当执行了make fe后,dist目录下会有最新的.js和.css文件。此时sync_fe_files会的计算
    这些文件的md5,然后去static目录下寻找对应的文件并计算md5,然后会进行md5的比较。如果md5
    不一致则在static目录下生成新的文件。static目录下的文件命名为{name}_{md5}.[js|css]。
    当static目录下存在了最新的前端文件后,sync_fe_files会的解析template下的文件,并替换
    这些文件依赖的前端文件。这些依赖的前端文件的路径为/static/js/laup和
    /static/css/laup。
    替换后template下的html文件就会使用最新的前端文件。
    """

    css_static_path = 'css/laup'
    js_static_path = 'js/laup'

    print('step 1')
    # 遍历dist目录,获取到最新的文件信息。这类文件目前只有两种:XXX.js和XXX.css。
    dist_css_files = {}
    dist_js_files = {}
    for root, dirs, files in os.walk(dist):
        for dist_file in files:
            if len(dist_file) < 4:
                print("len of dist_file is short then 4!")
                continue
            if dist_file[-3:] == '.js':
                m = hashlib.md5()
                dist_js_filename = dist_file[:-3]
                with open(os.path.join(root, dist_file), 'rb') as f:
                    while True:
                        data = f.read(1024)
                        if not data:
                            break
                        m.update(data)
                dist_js_md5 = m.hexdigest()
                dist_js_files[dist_js_filename] = {
                    'md5': dist_js_md5,
                    'path': root,
                    'filename': dist_file
                }
            elif dist_file[-4:] == '.css':
                m = hashlib.md5()
                dist_css_filename = dist_file[:-4]
                with open(os.path.join(root, dist_file), 'rb') as f:
                    while True:
                        data = f.read(1024)
                        if not data:
                            break
                        m.update(data)
                dist_css_md5 = m.hexdigest()
                dist_css_files[dist_css_filename] = {
                    'md5': dist_css_md5,
                    'path': root,
                    'filename': dist_file
                }
    print("dist_css_files:")
    print(dist_css_files)
    print("dist_js_files:")
    print(dist_js_files)

    print('\nstep 2')
    # 遍历static目录,找到dist中文件在static的对应文件并比较md5,如果md5不一致则更新,
    # 同时记录最新的信息到css_files和js_files字典中用于后续template操作。
    # 需要注意的是对于static目录laup的文件都在其static/js/laup
    # 和static/css/laup目录下
    css_static_fullpath = os.path.join(static, css_static_path)
    js_static_fullpath = os.path.join(static, js_static_path)
    for f_name in dist_css_files:
        for root, dirs, files in os.walk(css_static_fullpath):
            for f in files:
                if f.startswith(f_name) \
                        and (len(f)==(len('.css')+len(f_name)+33)):
                    print('{0}对应的当前css文件为{1}'.format(f_name, f))
                    # 计算MD5进行比较,如果不一致则更新
                    m = hashlib.md5()
                    with open(os.path.join(root, f), 'rb') as fi:
                        while True:
                            data = fi.read(1024)
                            if not data:
                                break
                            m.update(data)
                    if m.hexdigest() != dist_css_files[f_name]['md5']:
                        new_f_name = '{0}_{1}.css'.format(f_name,
                                                          dist_css_files[f_name]['md5'])
                        print('生成新的css文件,文件名: {0}'.format(new_f_name))
                        target_data = u''
                        with open(os.path.join(dist_css_files[f_name]['path'],
                                               dist_css_files[f_name]['filename']), 'r') as fi:
                            target_data = fi.read()
                        with open(os.path.join(root, new_f_name), 'w') as fi:
                            fi.write(target_data)
                        # 删除老的文件
                        os.remove(os.path.join(root, f))
                    break
    for f_name in dist_js_files:
        for root, dirs, files in os.walk(js_static_fullpath):
            for f in files:
                if f.startswith(f_name) \
                        and (len(f)==(len('.js')+len(f_name)+33)):
                    print('{0}对应的当前js文件为{1}'.format(f_name, f))
                    # 计算MD5进行比较,如果不一致则更新
                    m = hashlib.md5()
                    with open(os.path.join(root, f), 'rb') as fi:
                        while True:
                            data = fi.read(1024)
                            if not data:
                                break
                            m.update(data)
                    if m.hexdigest() != dist_js_files[f_name]['md5']:
                        new_f_name = '{0}_{1}.js'.format(f_name,
                                                         dist_js_files[f_name]['md5'])
                        print('生成新的js文件,文件名: {0}'.format(new_f_name))
                        target_data = u''
                        with open(os.path.join(dist_js_files[f_name]['path'],
                                               dist_js_files[f_name]['filename']), 'r') as fi:
                            target_data = fi.read()
                        with open(os.path.join(root, new_f_name), 'w') as fi:
                            fi.write(target_data)
                        # 删除老的文件js
                        os.remove(os.path.join(root, f))
                    break

    print('\nstep 3')
    # 遍历template目录,对于每个html文件,分别搜索如下的关键字:
    # <link type="text/css" rel="stylesheet" href="/static/css/laup/XXX.css"/>
    # <script type="text/javascript" src="/static/js/laup/XXX.js"></script>
    # 如果找到对应的关键字,则将其中的XXX.css、XXX.js替换为最新的文件
    # 处理css文件
    css_regexp = r'<link\s+type="text/css"\s+rel="stylesheet"\s+href="/static/css/laup/(\S+?)\.css"/>'
    css_regobj = re.compile(css_regexp)
    for root, dirs, files in os.walk(template):
        for html_file in files:
            html_file_path = os.path.join(root, html_file)
            html_file_content = ''
            with open(html_file_path, 'r') as fi:
                html_file_content = fi.read()
            targets = css_regobj.findall(html_file_content)
            targets = list(set(targets))
            for target in targets:
                if '_' not in target:
                    continue
                target_name = target.split('_')[0]
                if target_name not in dist_css_files:
                    continue
                print('尝试在{0}中用{1}替换{2}'.format(html_file_path,
                                                '{0}_{1}'.format(target_name, dist_css_files[target_name]['md5']),
                                                target))
                result, number = re.compile(target+ r'\.css').subn('{0}_{1}.css'.format(target_name, dist_css_files[target_name]['md5']), html_file_content)
                if number != 0:
                    print('上面的替换共替换了{0}处css'.format(number))
                    with open(html_file_path, 'w') as fi:
                        fi.write(result)
                    html_file_content = result
    print('------')
    # 处理js文件
    js_regexp = r'<script\s+type="text/javascript"\s+src="/static/js/laup/(\S+?)\.js"></script>'
    js_regobj = re.compile(js_regexp)
    for root, dirs, files in os.walk(template):
        for html_file in files:
            html_file_path = os.path.join(root, html_file)
            html_file_content = ''
            with open(html_file_path, 'r') as fi:
                html_file_content = fi.read()
            targets = js_regobj.findall(html_file_content)
            targets = list(set(targets))
            for target in targets:
                if '_' not in target:
                    continue
                target_name = target.split('_')[0]
                if target_name not in dist_js_files:
                    continue
                print('尝试在{0}中用{1}替换{2}'.format(html_file_path,
                                                '{0}_{1}'.format(target_name, dist_js_files[target_name]['md5']),
                                                target))
                result, number = re.compile(target + r'\.js').subn('{0}_{1}.js'.format(target_name, dist_js_files[target_name]['md5']), html_file_content)
                if number != 0:
                    print('上面的替换共替换了{0}处js'.format(number))
                    with open(html_file_path, 'w') as fi:
                        fi.write(result)
                    html_file_content = result

    print('\nfinished')


if __name__ == '__main__':
    # python fe_version.py dist_path static_path template_path
    if len(sys.argv) != 4:
        raise Exception("invalid args")
    dist_path = sys.argv[1]
    static_path = sys.argv[2]
    template_path = sys.argv[3]
    sync_fe_files(dist_path,
                  static_path,
                  template_path)


