PAN.ABLE READ ME
=================

For desktop : 
-------------
file must be 768px width


For mobile :
------------ 
file must be 400px width



Replace with your own source : 
------------------------------

In the "img" folder, you will find the three levels of the interface.
You can replace these source elements files by overwriting them with your own files.
Your files must have the exact same name as the originals.
In order to do it :
Paste your file (named "level-3-desktop.png") in the "img" folder.
						
						----- OR -----

Directly change the source file in the HTML file.
Open "index.html" with a text editor, go to the following part of code :

<!-- CHANGE IMAGE FILE -->

<div style="z-index:3;" id="wrap-img1" class="swiper-slide-element img1">
	<img id="img1" data-src="img/level-1-desktop.png" data-src-mobile="img/level-1-mobile.png" />
</div>

Change the "data-src" and "data-src-mobile" attribute by replacing the path indicated by the path of your own files.
Iterate this with the two other levels.

Make sure to replace the image in the corresponding levels.
For information, level 3 corresponds to the background image, 
level 2 is the intermediate one
and level 1 is the front image. 



More informations about settings :
----------------------------------

window.panableConfig = {
    // start position (0 to 1)
    "initX": 0,

    // leave horizontal for pan.able
    "direction": 'horizontal', 

    // show on screen debug info
    "debug": false,

    // leave this value true
    "strictMobileScroll": true,

    // set your background color
    "bg": '#000000',

    // scroll duration (40 = very quick , 100 = slow)
    "scrollSpeed":56,

    // scroll distance (px)
    "scrollDistance":2000,

    // ratio for mobile portrait (1 = square)
    "ratio_mobile_portrait":1.3,

    // momentum distance (0 to 1)
    "momentumRatio":0.1,

    // momentum speed (0 to 1)
    "momentumVelocityRatio":0.2,

    // scrool speed for touchpad (0 to 1)
    "touchScrollSensitivity":0.5,

    // minimal distance to trigger momentum effect (0.001 = always, 1 = never)
    "minimumVelocity":0.001,			        
};