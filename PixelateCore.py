'''
Created on Nov 23, 2019

@author: navendusinha
'''


import cv2
import os, logging, sys, time

logpath = os.path.join(os.getcwd(), 'log', 'pixelate-core.log')
logdir = os.path.dirname(logpath)
if not os.path.exists(logdir):
    print("Log directory does not exist, creating %s" % (logdir))
    os.makedirs(logdir)

logging.basicConfig(filename=logpath, level=logging.DEBUG, format='%(asctime)s %(message)s')
handler = logging.StreamHandler(sys.stdout)
logging.getLogger().addHandler(handler)


class PixelateCore(object):
    '''
    PixelateCore would build a classifier object
    which can called on multiple images
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


    def processImage(self, iFile):
        """
        Process Image
        :param iFile:
        :return: processed image path
        """

    def facedetectFrame(self, imgpath=None, imgaeName=None, wwwbase=None):
        '''
        Perform Face detection on the frame
        +iframe : output of cv2.imread
        '''
        if not os.path.exists(imgpath):
            return {'error': 'Image does not exists, %s' % (imgpath)}

        # Read Image Path
        frame = cv2.imread(imgpath)

        # pximg is the final image, and we'll copy it from the first image
        pximg = frame.copy()

        # check if grayscale conversion is needed
        grayScale = False
        grayFrame = frame
        if len(frame) < 2:
            # strating image is grayscale
            grayScale = True
            logging.info("Image %s is grayscale" % (imgpath))
        else:
            # strating image is color, grayscale conversion is needed
            logging.info("Converting %s to grayscale" % (imgpath))
            grayFrame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Execute the FaceDetectionModel
        faces = self.faceCascade.detectMultiScale(
            grayFrame,
            scaleFactor=1.01,
            minNeighbors=18,
            minSize=(12, 12)
            # flags = cv2.CV_HAAR_SCALE_IMAGE
        )

        print("Faces: %s" % (faces))
        # Iterate over detected aces
        facearray = []
        for (x, y, w, h) in faces:
            # crop out each detected face with a pixelboundry
            crop_img = frame[y + 2:y + h - 2, x + 2:x + w - 2]
            facearray.append({x, y, w, h})
            # Make a pixelating canvas
            px_wd = int(w / 16)
            px_ht = int(h / 16)
            if px_wd > 24:
                px_wd = 16
            if px_ht > 16:
                px_ht = 16

            # scale the pixelated canvas back to size of faces
            tpxltd = cv2.resize(crop_img, (px_wd, px_ht), interpolation=cv2.INTER_AREA)
            pxltd = cv2.resize(tpxltd, (w - 4, h - 4), interpolation=cv2.INTER_NEAREST)

            # replace each face in the image by its pixelated version
            pximg[y + 2:y + h - 2, x + 2:x + w - 2] = pxltd

            # timestamp after conversion
            ts2 = self.epoch()

        pfnamex = "{}-pxltd.JPG".format(ts2)
        odir = os.path.join(wwwbase, 'pxltd')
        if not os.path.exists(odir):
            logging.info('Creating output directory, %s' % (odir))
            os.makedirs(odir)
        pfname = os.path.join(wwwbase, 'pxltd', pfnamex)
        logging.info('Writing image file, %s' % (pfname))
        cv2.imwrite(pfname, pximg)

        # Return Object
        print("Facearray: %s" % (facearray))
        retobj = {'faces': facearray, 'outfile': pfnamex}
        return retobj

    def epoch(self):
        """
        Returns Unix Epoch
        """
        epc = int(time.time() * 1000)

        return epc
