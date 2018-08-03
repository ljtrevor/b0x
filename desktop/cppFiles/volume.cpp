#include <iostream>
#include <windows.h>

int main(int argc, char* argv[]) {
    int oldValue = atoi(argv[1]);
    int newValue = atoi(argv[2]);
    int diff = newValue - oldValue;
    if (diff < 0) {
        diff = diff * -1;
        int interval = diff/2;
        INPUT ctrlV [interval * 2];
        ZeroMemory(ctrlV, sizeof ctrlV);

        for (int i = 0; i < interval * 2; i++) {
            if (i % 2 == 0) {
                ctrlV [i].type = INPUT_KEYBOARD;
                ctrlV [i].ki.wVk = VK_VOLUME_DOWN;
            } else {
                ctrlV [i].type = INPUT_KEYBOARD;
                ctrlV [i].ki.wVk = VK_VOLUME_DOWN;
                ctrlV [i].ki.dwFlags = KEYEVENTF_KEYUP;
            }
        }
        SendInput (interval * 2, ctrlV, sizeof (INPUT));
    } else if (diff > 0) {
        int interval = diff/2;
        INPUT ctrlV [interval * 2];
        ZeroMemory(ctrlV, sizeof ctrlV);

        for (int i = 0; i < interval * 2; i++) {
            if (i % 2 == 0) {
                ctrlV [i].type = INPUT_KEYBOARD;
                ctrlV [i].ki.wVk = VK_VOLUME_UP;
            } else {
                ctrlV [i].type = INPUT_KEYBOARD;
                ctrlV [i].ki.wVk = VK_VOLUME_UP;
                ctrlV [i].ki.dwFlags = KEYEVENTF_KEYUP;
            }
        }
        SendInput (interval * 2, ctrlV, sizeof (INPUT));
    }
    return 0;
}