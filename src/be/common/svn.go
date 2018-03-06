package common

import (
	"bytes"
	"fmt"
	log "github.com/Sirupsen/logrus"
	"os/exec"
)

type SVNTool struct {
	localDir      string
	remoteAddress string
	project       string
	svnUsername   string
	svnPassword   string
}

func NewSVNTool(localDir string, remoteAddress string, project string, svnUsername string, svnPassword string) *SVNTool {
	return &SVNTool{
		localDir:      localDir,
		remoteAddress: remoteAddress,
		project:       project,
		svnUsername:   svnUsername,
		svnPassword:   svnPassword,
	}
}

func (s *SVNTool) Checkout() error {
	cmdStr := fmt.Sprintf("cd %s && svn co %s/%s --no-auth-cache --non-interactive --trust-server-cert --username %s --password %s", s.localDir, s.remoteAddress, s.project, s.svnUsername, s.svnPassword)
	log.Infoln(cmdStr)

	var cmd *exec.Cmd
	var outb, errb bytes.Buffer

	cmd = exec.Command("sh", "-c", cmdStr)
	cmd.Stdout = &outb
	cmd.Stderr = &errb

	err := cmd.Run()
	if err != nil {
		log.WithFields(log.Fields{
			"cmd":  cmdStr,
			"outb": outb.String(),
			"errb": errb.String(),
			"err":  err.Error(),
		}).Error("SVN Checkout 失败")
		return err
	}
	log.Infoln(outb.String())
	log.Infoln(errb.String())

	return nil
}

func (s *SVNTool) Add() error {
	cmdStr := fmt.Sprintf("cd %s/%s && svn st --no-auth-cache --non-interactive --trust-server-cert --username %s --password %s | grep \"?\" | tr -s \" \" | cut -d\" \" -f2 | xargs svn add --no-auth-cache --non-interactive --trust-server-cert --username %s --password %s", s.localDir, s.project, s.svnUsername, s.svnPassword, s.svnUsername, s.svnPassword)
	log.Infoln(cmdStr)

	var cmd *exec.Cmd
	var outb, errb bytes.Buffer

	cmd = exec.Command("sh", "-c", cmdStr)
	cmd.Stdout = &outb
	cmd.Stderr = &errb

	err := cmd.Run()
	if err != nil {
		log.WithFields(log.Fields{
			"cmd":  cmdStr,
			"outb": outb.String(),
			"errb": errb.String(),
			"err":  err.Error(),
		}).Error("SVN Add 失败")
		return err
	}
	log.Infoln(outb.String())
	log.Infoln(errb.String())

	return nil
}

func (s *SVNTool) Update() error {
	cmdStr := fmt.Sprintf("cd %s/%s && svn up --non-interactive --trust-server-cert --username %s --password %s", s.localDir, s.project, s.svnUsername, s.svnPassword)
	log.Infoln(cmdStr)

	var cmd *exec.Cmd
	var outb, errb bytes.Buffer

	cmd = exec.Command("sh", "-c", cmdStr)
	cmd.Stdout = &outb
	cmd.Stderr = &errb

	err := cmd.Run()
	if err != nil {
		log.WithFields(log.Fields{
			"cmd":  cmdStr,
			"outb": outb.String(),
			"errb": errb.String(),
			"err":  err.Error(),
		}).Error("SVN Update 失败")
		return err
	}
	log.Infoln(outb.String())
	log.Infoln(errb.String())

	return nil
}

func (s *SVNTool) Commit(msg string) error {
	if msg == "" {
		msg = "ref #30034 @2m"
	}

	cmdStr := fmt.Sprintf("cd %s/%s && svn commit -m \"%s\" --non-interactive --trust-server-cert --username %s --password %s", s.localDir, s.project, msg, s.svnUsername, s.svnPassword)
	log.Infoln(cmdStr)

	var cmd *exec.Cmd
	var outb, errb bytes.Buffer

	cmd = exec.Command("sh", "-c", cmdStr)
	cmd.Stdout = &outb
	cmd.Stderr = &errb

	err := cmd.Run()
	if err != nil {
		log.WithFields(log.Fields{
			"cmd":  cmdStr,
			"outb": outb.String(),
			"errb": errb.String(),
			"err":  err.Error(),
		}).Error("SVN Commit 失败")
		return err
	}
	log.Infoln(outb.String())
	log.Infoln(errb.String())

	return nil
}
