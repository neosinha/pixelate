'''
Created on May 5, 2018
@author: navendusinha
'''

import cv2
import os
import argparse
import logging
import magic
import datetime, time


class Pixelate(object):
    '''
    Pixelate Class
    '''


    frame= None 
    numimages = 0
    outdir = None
    
    outdir = None
    # Create the haar cascade
    faceCascade = None 
    faces = None 
    frame = None 
    gray = None 

    batchCount = 0
    imprefix = None
    
    #Windo size for monitoring camera
    windowSize = (640, 360) 
    cameraMode = False

    def __init__(self, cascPath=None, imagepath=None, outdir=None, imprefix=None):
        """
        """
        self.cameraMode = False
        self.cascPath = os.path.join(os.getcwd(),  
                                     'models', 
                                     'haarcascades',
                                     'haarcascade_frontalface_alt2.xml')
        if cascPath:
            self.cascPath = cascPath
        
        
        print('Log: %s' % (self.cascPath))
        self.faceCascade = cv2.CascadeClassifier(self.cascPath)
        
        if imprefix: 
            self.imprefix = imprefix
        
        self.outdir = os.getcwd()
        if outdir: 
            self.outdir = outdir
            
        # check if output dir exists            
        if not os.path.exists(self.outdir):
            os.makedirs(self.outdir)
            
        print("Path: {}".format(imagepath))
        if os.path.exists(imagepath):    
            # check if imagepath is file or folder
            
            if os.path.isdir(imagepath): 
                self.batchCount = 0
                for f in os.listdir(imagepath): 
                    print("File: {}".format(f))
                    impath = os.path.join(imagepath, f)
                    self.extractFaces(impath, batch=True)
                    
            elif os.path.isfile(imagepath):
                ftype = magic.from_file(imagepath, mime=True) 
                self.loginfo("File {} is {}".format(imagepath, ftype))
                if 'frame' in ftype: 
                    self.extractFaces(imagepath)
                    
        else:
            print("Error: Failed to open frame file, {}".format(imagepath))

    

    def loginfo(self, message):
        """
        """
        print(message)
        logging.info(message)
    
    
    
    def extractFaces(self, imagepath, batch=False):
        """
        Extract and save images
        """
        ftype = magic.from_file(imagepath, mime=True) 
        self.loginfo("Processing file {} is {}".format(imagepath, ftype))
        if 'image' in ftype: 
            self.frame = cv2.imread(imagepath)
            self.gray = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
            self.detectFaces()
            self.pixelateFaces(batch=batch)
        else: 
            logging.error('File: %s is not an frame file. Skipping.' % (imagepath))


    def detectFaces(self):
        """
        # Detect faces in the frame
        """
        self.faces = self.faceCascade.detectMultiScale(
            self.gray,
            scaleFactor=1.01,
            minNeighbors=18,
            minSize=(12, 12)
            #flags = cv2.CV_HAAR_SCALE_IMAGE
            )
    
    
        
    def pixelateFaces(self, batch=False):
        # Draw a rectangle around the faces
        if not batch: 
            count = 1
        else: 
            count = self.batchCount
            
        pximg = self.frame
        
        #tstamp = str(datetime.datetime.today()).split('.')[0]
        #lbl = '{} Faces   {}'.format(len(self.faces), tstamp)
        fontColor = (0, 255, 0)
        height, width, channels = self.frame.shape
        
        for (x, y, w, h) in self.faces:
            #print("Face[{}]: ({}, {}), ({}, {})".format(count, x,y, (x+w), (y+h)))
            crop_img = self.frame[y+2:y+h-2, x+2:x+w-2]
            
            # Make a pixelating canvas
            px_wd= int(w/16)
            px_ht = int(h/16)
            
            if px_wd > 24: 
                px_wd = 16
                
            if px_ht > 16: 
                px_ht = 16
            
            ts1 = self.epoch()
            #print('Pixelated: %s, %s' % (px_wd, px_ht))    
            tpxltd = cv2.resize(crop_img, (px_wd, px_ht ), interpolation=cv2.INTER_AREA)
            pxltd = cv2.resize(tpxltd, (w-4,h-4), interpolation=cv2.INTER_NEAREST)
            
            fnamex = "{}.JPG".format(count)
            pfnamex = "{}-pxl.JPG".format(count)
            
            pximg[y+2:y+h-2, x+2:x+w-2] = pxltd
                       
            if self.imprefix:
                fnamex = "{}-{}.JPG".format(self.imprefix,count)
                pfnamex = "{}-{}-pxl.JPG".format(self.imprefix,count)
                
            fname = os.path.join(self.outdir, fnamex)
            pfname = os.path.join(self.outdir, pfnamex)
            #self.loginfo("Generating face file, {}".format(fname))
            #self.loginfo("Generating pixelated face file, {}".format(pfname))
            #cv2.imwrite(fname,crop_img)
            #cv2.imwrite(pfname, pxltd)
            
            count += 1
            if batch: 
                self.batchCount = count
            
             
            ts2 = self.epoch()
            print('Duration: %s, %s, %s' % (ts2-ts1, ts1, ts2))
       
                
        #cv2.putText(pximg, lbl, (width-int(width*0.9), 
        #                         (height-int(height*0.9) ) ),
        #                         cv2.FONT_HERSHEY_SIMPLEX, 1, fontColor)
        
        pfnamex = "{}-pxltd.JPG".format(count)
        pfname = os.path.join(self.outdir, pfnamex)
        #print("===Camera Mode: %s" % (self.cameraMode) )
        if self.cameraMode:
            self.oframe = pximg
        else:
            logging.info('Writing image file, %s' % (pfname))
            cv2.imwrite(pfname, pximg)
        
    def startCamera(self):
        """
        Process Camera
        """
        self.camera = cv2.VideoCapture(0)
        if self.camera.isOpened():
            logging.info("Camera is ready")
            self.cameraMode = True
    
        while True: 
            ret, self.frame = self.camera.read()
            self.gray = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
            
            grayFrame = cv2.resize(self.frame, self.windowSize, interpolation=cv2.INTER_LINEAR)             
            cv2.imshow("Face", grayFrame)
 
            self.detectFaces()
            self.pixelateFaces(batch=False)

            
            oFrame = cv2.resize(self.oframe, self.windowSize,  interpolation=cv2.INTER_LINEAR)             
            cv2.imshow("PxFace", oFrame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        #self.camera.release()
        cv2.destroyAllWindows()


    def epoch(self):
        """
        Returns Unix Epoch
        """
        epc = int(time.time()*1000)
        return epc 


if __name__ == '__main__':
    
    logging.basicConfig(filename=os.path.join(os.getcwd(), "transcript.log"), level=logging.DEBUG)
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--image", required=False,
                help="Input Image")

    ap.add_argument("-d", "--odir", required=False,
                help="Directory in which extracted face images should be stored")
    
    ap.add_argument("-p", "--prefix", required=False,
                help="Prefix which is to be added to the extracted face frame")
    
    
      
    ap.add_argument("-c", "--camera", required=True,
                help="True/False, use camera or not")
    
    
    
    
    args = vars(ap.parse_args())
    imgpath = args["image"]
    outdir  = args["odir"]
    prefix  = args["prefix"]
    camera = args['pre']
    
    c = Pixelate(imagepath=imgpath, outdir=outdir, imprefix=prefix)
    c.startCamera()
    
    