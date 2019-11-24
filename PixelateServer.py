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


class PixelateServer(object):
    '''
    classdocs
    '''


    def __init__(self, staticdir=None):
        '''
        Constructor
        '''
        self.staticdir = os.path.join(os.getcwd(), 'ui_www')
        if www: 
            self.staticdir = www
        logging.info("Static directory for web-content: %s" % (self.staticdir))
        
        # Intializing the upload directory
        uploaddir = os.path.join(self.staticdir, '..', 'uploads')
        if uploaddir: 
            self.uploaddir = uploaddir
            

        



# main code section   
if __name__ == '__main__':
    port = 9005
    www = os.path.join(os.getcwd(), 'ui_www')
    ipaddr = '127.0.0.1'
    dbip = '127.0.0.1'
    logpath = os.path.join(os.getcwd(), 'log', 'pixelate.log')
    logdir = os.path.dirname(logpath)
    if not os.path.exists(logdir):
        print("Log directory does not exist, creating %s" % (logdir))
        os.makedirs(logdir)

    logging.basicConfig(filename=logpath,level=logging.DEBUG, format='%(asctime)s %(message)s')
    handler = logging.StreamHandler(sys.stdout) 
    logging.getLogger().addHandler(handler)

    
    ap = argparse.ArgumentParser()  
    ap.add_argument("-p", "--port", required=False, default=6001,
                help="Port number to start HTTPServer." )

    ap.add_argument("-i", "--ipaddress", required=False, default='127.0.0.1', 
                help="IP Address to start HTTPServer")

    ap.add_argument("-s", "--static", required=False, default=www,
                help="Static directory where WWW files are present")

    ap.add_argument("-f", "--logfile", required=False, default=logpath,
                    help="Directory where application logs shall be stored, defaults to %s" % (logpath) )

    # Parse Arguments
    args = vars(ap.parse_args())
    portnum = int(args["port"])
    ipadd = args["ipaddress"]
    staticwww = os.path.abspath(args['static'])

    HttpServer.config.update({'server.socket_host': ipadd,
                           'server.socket_port': portnum,
                           'server.socket_timeout': 60,
                           'server.thread_pool': 8,
                           'server.max_request_body_size': 0
                           })

    static_dir = staticwww

    logging.info("Static dir: %s " % (static_dir))
    conf = { '/': {
            'tools.sessions.on': True,
            'tools.staticdir.on': True,
            'tools.staticdir.dir': static_dir}
            }

    HttpServer.quickstart(PixelateServer(staticdir=static_dir),
                            '/', conf)


