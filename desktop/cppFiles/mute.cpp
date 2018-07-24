#include <iostream>
#include <windows.h>

int main() {
    std::cout << "MUTE\n";
    Sleep(5000)

    INPUT ctrlV [2];
    ZeroMemory(ctrlV, sizeof ctrlV);

    ctrlV [0].type = INPUT_KEYBOARD;
    ctrlV [0].ki.wVk = VK_F5;

    ctrlV [1].type = INPUT_KEYBOARD;
    ctrlV [1].ki.wVk = VK_F5;
    ctrlV [1].ki.dwFlags = KEYEVENTF_KEYUP;

    SendInput (2, ctrlV, sizeof (INPUT));

    return 0;
}