MCU=attiny13
CC=avr-gcc
OBJCOPY=avr-objcopy
CFLAGS=-g -mmcu=$(MCU) -Os

all: controldriver.hex

controldriver.hex : controldriver.o 
	$(OBJCOPY) -R .eeprom -O ihex controldriver.o controldriver.hex 
controldriver.o : controldriver.c 
	$(CC) $(CFLAGS) -Os -o controldriver.o controldriver.c
clean:
	rm -f *.hex *.o