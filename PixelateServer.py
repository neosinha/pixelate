'''
Created on Nov 23, 2019

@author: navendusinha
'''

import os
import argparse, magic
import base64, json
import logging
import datetime, time, os, sys, shutil
import cherrypy as HttpServer
from PixelateCore import PixelateCore

class PixelateServer(object):
    '''
    classdocs
    '''

    staticdir = None

    def __init__(self, staticdir=None, cascPath=None):
        '''
        Constructor
        '''

        self.staticdir = os.path.join(os.getcwd(), 'ui_www')
        if staticdir:
            self.staticdir = staticdir

        logging.info("Static directory for web-content: %s" % self.staticdir)
        
        # Intializing the upload directory
        uploaddir = os.path.join(self.staticdir, '..', 'uploads')
        if uploaddir: 
            self.uploaddir = uploaddir

        # Initiallize FaceDetectCore
        cascDir = os.path.abspath(os.getcwd())
        if cascPath:
            cascDir = cascPath

        logging.info('Cascade path is %s' % cascPath)
        self.pxlcore = PixelateCore(cascadePath=cascPath)
            
    @HttpServer.expose
    def index(self):
        """
        Sources the index file
        :return: raw index file
        """

        return open(os.path.join(self.staticdir, "index.html"))

    @HttpServer.expose
    def imgupload(self, upfile):
        """
        Handles image upload
        :return:
        """
        self.uploaddir = os.path.join(self.staticdir, 'uploads')
        print("UploadFile: Name: %s, Type: %s " % (upfile.filename, upfile.content_type))
        fext = str(upfile.content_type).split('/')[1]
        print("Extension: %s" % (fext))

        if not os.path.exists(self.uploaddir):
            logging.info('Upload directory does not exist, creating %s' % (self.uploaddir))
            os.makedirs(self.uploaddir)

        if upfile is not None:
            tsx = self.epoch()
            ofile = os.path.join(self.uploaddir, "%s.%s" % (tsx, fext))
            print("Local filename: %s" % (ofile))
            ofilex = open(ofile, "wb")
            shutil.copyfileobj(upfile.file, ofilex)
            logging.info("Copied uploaded file as %s" % (ofilex))
            ofilex.close()
            uptstamp = self.epoch()
            pxfaces = self.pixelatefaces(ifile=upfile.filename)
            enstamp = self.epoch()
            wwwbase = os.path.basename(self.staticdir)

            # out = {"start": uptstamp,
            #       'orgimg': "uploads/%s" % (upfile.filename),
            #       'pxlimg': "pxltd/%s" % (pxfaces['outfile']),
            #       'end' : enstamp}

            out = {"start": uptstamp,
                   'upimg': "%s.%s" % (tsx, fext),
                   'end' : enstamp}

            return json.dumps(out)
        else:
            return "Parameter: \"theFile\" was not defined"

    @HttpServer.expose
    def pixelatefaces(self, ifile):
        """

        :return:
        """
        print("Checking upfile:  %s" % (ifile))
        rawimg = os.path.join(self.uploaddir, ifile)
        pxlfaces = self.pxlcore.facedetectFrame(imgpath=rawimg,
                                                imgaeName=ifile,
                                                wwwbase=self.staticdir)

        return json.dumps(pxlfaces)

    def epoch(self):
        """
        Returns Unix Epoch
        """
        epc = int(time.time() * 1000)

        return epc


# main code section
if __name__ == '__main__':
    port = 9005
    www = os.path.join(os.getcwd(), 'ui_www')
    ipaddr = '127.0.0.1'
    dbip = '127.0.0.1'
    logpath = os.path.join(os.getcwd(), 'log', 'pixelate.log')
    logdir = os.path.dirname(logpath)

    cascPath = os.path.abspath(os.getcwd())

    ap = argparse.ArgumentParser()  
    ap.add_argument("-p", "--port", required=False, default=6001,
                help="Port number to start HTTPServer." )

    ap.add_argument("-i", "--ipaddress", required=False, default='127.0.0.1', 
                help="IP Address to start HTTPServer")

    ap.add_argument("-s", "--static", required=False, default=www,
                help="Static directory where WWW files are present")

    ap.add_argument("-c", "--cascpath", required=False, default=cascPath,
                    help="Directory where cascase files are found, defaults to %s" % (cascPath))

    ap.add_argument("-f", "--logfile", required=False, default=logpath,
                    help="Directory where application logs shall be stored, defaults to %s" % (logpath) )

    # Parse Arguments
    args = vars(ap.parse_args())
    if args['port']:
        portnum = int(args["port"])

    if args['ipaddress']:
        ipadd = args["ipaddress"]

    if args['static']:
        staticwww = os.path.abspath(args['static'])

    if args['logfile']:
        logpath = os.path.abspath(args['logfile'])
    else:
        if not os.path.exists(logdir):
            print("Log directory does not exist, creating %s" % (logdir))
            os.makedirs(logdir)

    if args['cascpath']:
        cascPath = args['cascpath']

    logging.basicConfig(filename=logpath, level=logging.DEBUG, format='%(asctime)s %(message)s')
    handler = logging.StreamHandler(sys.stdout)
    logging.getLogger().addHandler(handler)

    HttpServer.config.update({'server.socket_host': ipadd,
                           'server.socket_port': portnum,
                           'server.socket_timeout': 60,
                           'server.thread_pool': 8,
                           'server.max_request_body_size': 0
                           })

    logging.info("Static dir: %s " % (staticwww))
    conf = { '/': {
            'tools.sessions.on': True,
            'tools.staticdir.on': True,
        'tools.staticdir.dir': staticwww}
            }

    HttpServer.quickstart(PixelateServer(staticdir=staticwww,
                                         cascPath=cascPath),
                            '/', conf)


