:: use to set fuse, only need once.
avrdude -p attiny13 -P com4 -c stk500v1  -b 9600 -q -U lfuse:w:0x7a:m -U hfuse:w:0xff:m

:: use to download code
avrdude -p attiny13 -c arduino -P com3 -b 19200 -q -U flash:w:controldriver.hex