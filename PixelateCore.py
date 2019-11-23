'''
Created on Nov 23, 2019

@author: navendusinha
'''


import cv2
import os

class PixelateCore(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor for PixelCore
        '''
        self.cascPath = os.path.join(os.getcwd(),  
                                     'models', 
                                     'haarcascades',
                                     'haarcascade_frontalface_alt2.xml')
        
        self.faceCascade = cv2.CascadeClassifier(self.cascPath)
        
    
    def facedetectFrame(self, iframe):
        '''
        Perform Face detection on the frame
        +iframe : 
        '''
        grayFrame = cv2.cvtColor(iframe, cv2.COLOR_BGR2GRAY)
        print(len(grayFrame))
        



        