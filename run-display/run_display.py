from link import link
from selenium import webdriver
import pyautogui
import datetime

if __name__ == "__main__":
    current_date_time = datetime.datetime.now()

    print(f"[{current_date_time}] Link is: {link}")

    chromeoptions = webdriver.ChromeOptions()
    chromeoptions.add_argument(
        "--disable-infobars"  # remove info bars from top of chrome
    )
    chromeoptions.add_argument("--kiosk")  # enable kiosk mode
    chromeoptions.add_experimental_option(
        "excludeSwitches", ["enable-automation"]  # disable automation warning
    )
    chromeoptions.add_experimental_option(
        "useAutomationExtension", False  # disable automation warning
    )

    driver = webdriver.Chrome(options=chromeoptions)
    driver.get(link)
    screen_size = pyautogui.size()
    pyautogui.FAILSAFE = False
    pyautogui.moveTo(screen_size[0] - 1, screen_size[1] - 1)
