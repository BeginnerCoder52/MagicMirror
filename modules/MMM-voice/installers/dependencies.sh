#!/usr/bin/env bash

# Magic Mirror
# Module: MMM-voice
#
# By fewieden https://github.com/fewieden/MMM-voice
# MIT Licensed.

echo -e "\e[0m"
echo '       `/ymNMNds-'
echo '      :mMMMMMMMMMy`'
echo '     .NMMMMMMMMMMMh'
echo '     /MMMMMMMMMMMMN'
echo '     /MMMMMMMMMMMMN                       ``    `.:+oo/.         ``       ``````       `````.`'
echo '     /MMMMMMMMMMMMN           .-:+oy` +syhd-  `/hNMMMMMNs`   `osyhy     -ohmNNmh/` +syhhdmmNM:'
echo '     /MMMMMMMMMMMMN           dMMMMm /MMMMs  :dMMMMMMMMMMs   +MMMM/   -yNMMMMMMMM+.MMMMMMMMMM`'
echo '     /MMMMMMMMMMMMN           mMMMMy dMMMm``sMMMMMMNNMMMMN   dMMMm   +NMMMMMNNMd/ oMMMMmdhyys'
echo '     /MMMMMMMMMMMMN           NMMMM/:MMMM-`yMMMMNy:--dMMMM` .MMMM+  sMMMMMh:--:`  dMMMM. ```'
echo ' `-- /MMMMMMMMMMMMN `-.       MMMMM`dMMMs sMMMMN/    /MMMm  oMMMN` +MMMMN+       .MMMMNshdd+'
echo ' /MM`/MMMMMMMMMMMMN +Nm       MMMMd:MMMm`:MMMMN-     /MMM+  mMMMs `NMMMM:        oMMMMMMMMN/'
echo ' /MM`/MMMMMMMMMMMMN oMm      `MMMModMMM/ yMMMM/      dMMh` -MMMM- /MMMMs         mMMMmo/:-.`'
echo ' :MM.:MMMMMMMMMMMMm oMm      .MMMMoMMMh  mMMMM.    `sMMh`  sMMMd  +MMMM+    `.  -MMMMh/+osy'
echo ' `NMs yMMMMMMMMMMN:`mMs      :MMMNdMMM-  dMMMMh:--+dMMs`   NMMMo  -MMMMm/--+my  oMMMMMMMMMN'
echo '  :NMs./dNMMMMMNy-:dMh`      oMMMNMMMy   /MMMMMMNNMMd/    :MMMM-   oMMMMMNNMMh  mMMMMMMMMMd'
echo '   .yNNy///+++//+dNm+`       hNmdhyso.    /mMMMMMNh/`     yNdhs     :hmNNmho-` -Nmdhso+/:-.'
echo '     .ohmNNmmmNNmy/`         .```          `-/+/-`        .``         `````    `.``'
echo '        `.-NMy-``'
echo '           NMo'
echo '     ......NMy.....`'
echo '     mMMMMMMMMMMMMMo'
echo -e "\e[0m"


# installing packages
echo -e "\e[96m[STEP 1/5] Installing Packages\e[90m"
if sudo apt-get install bison libasound2-dev autoconf automake libtool python-dev-is-python3 python3-pip swig -y ;
then
    echo -e "\e[32m[STEP 1/5] Installing Packages | Done\e[0m"
else
	echo -e "\e[31m[STEP 1/5] Installing Packages | Failed\e[0m"
	exit;
fi


# installing sphinxbase
echo -e "\e[96m[STEP 2/5] Installing sphinxbase\e[90m"
cd ~
if [ ! -d "$HOME/sphinxbase" ] ;
then
    if ! git clone https://github.com/cmusphinx/sphinxbase.git ;
    then
        echo -e "\e[31m[STEP 2/5] Installing sphinxbase | Failed\e[0m"
        exit;
    fi
fi

cd sphinxbase
if ! git pull ;
then
    echo -e "\e[31m[STEP 2/5] Installing sphinxbase | Failed\e[0m"
    exit;
fi

./autogen.sh
./configure --enable-fixed
make
sudo make install
echo -e "\e[32m[STEP 2/5] Installing sphinxbase | Done\e[0m"


# installing pocketsphinx
echo -e "\e[96m[STEP 3/5] Installing pocketsphinx\e[90m"
cd ~
if [ ! -d "$HOME/pocketsphinx" ] ;
then
    if ! git clone https://github.com/cmusphinx/pocketsphinx.git ;
    then
        echo -e "\e[31m[STEP 3/5] Installing pocketsphinx | Failed\e[0m"
        exit;
    fi
fi

cd pocketsphinx
if ! git pull ;
then
    echo -e "\e[31m[STEP 3/5] Installing pocketsphinx | Failed\e[0m"
    exit;
fi

./autogen.sh
./configure
make
sudo make install
echo -e "\e[32m[STEP 3/5] Installing pocketsphinx | Done\e[0m"


# exporting paths
echo -e "\e[96m[STEP 4/5] Exporting paths\e[0m"
echo "export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib" >> ~/.bashrc
echo "export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib/pkgconfig" >> ~/.bashrc
echo -e "\e[32m[STEP 4/5] Exporting paths |  Done\e[0m"


# installing npm dependencies
echo -e "\e[96m[STEP 5/5] Installing npm dependencies\e[90m"
cd ~/MagicMirror/modules/MMM-voice
if npm install --productive;
then
    echo -e "\e[32m[STEP 5/5] Installing npm dependencies | Done\e[0m"
else
    echo -e "\e[31m[STEP 5/5] Installing npm dependencies | Failed\e[0m"
    exit;
fi


# displaying audio devices
echo -e "\e[96m[INFO] Possible Audio Devices to set in config.js\n\e[0m"
cat /proc/asound/cards
