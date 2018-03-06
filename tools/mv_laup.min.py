#!/usr/bin/env python
# coding:utf-8
# author:Chaser_ln

import os
import sys


def mv_laup_static(laup_dist, laup_static):
    js_static_path = 'js/laup'
    js_static_tartget_full_path = os.path.join(laup_static, js_static_path)
    js_dist_source_full_path = os.path.join(laup_dist, 'laup.min.js')
    cmd = "cp " + js_dist_source_full_path + " " +js_static_tartget_full_path
    os.system(cmd)
    print('cmd:', cmd)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise Exception('invalid args')
    laup_dist_path = sys.argv[1]
    laup_static_path = sys.argv[2]
    mv_laup_static(laup_dist_path, laup_static_path)