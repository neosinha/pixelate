'''
Created on Nov 23, 2019

@author: navendusinha
'''

import os
import argparse, magic
import base64, json
import logging
import datetime, time, os, sys, shutil



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
    logpath = os.path.join(os.getcwd(), 'log', )
    
    logging.basicConfig(filename='accurate-server.log',level=logging.DEBUG, format='%(asctime)s %(message)s')
    handler = logging.StreamHandler(sys.stdout) 
    logging.getLogger().addHandler(handler)

    
    ap = argparse.ArgumentParser()  
    ap.add_argument("-p", "--port", required=False, default=6001,
                help="Port number to start HTTPServer." )

    ap.add_argument("-i", "--ipaddress", required=False, default='127.0.0.1', 
                help="IP Address to start HTTPServer")

    ap.add_argument("-d", "--mongo", required=False, default='198.12.108.140', 
                help="IP Address for MongoDB server")
    
    ap.add_argument("-s", "--static", required=False, default=www, 
                help="Static directory where WWW files are present")

    args = vars(ap.parse_args())
    
    portnum = int(args["port"])
    ipadd = args["ipaddress"]
    dbadd = args["mongo"]
    staticwww = os.path.abspath(args['static'])
    
