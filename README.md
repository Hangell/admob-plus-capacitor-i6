## Admob Plus with capacitor 2022<h1>
<br>
<p style="color:red">Guide for <b>android</b> device only</p>
<p style="color:red">Before doing the procedures after the <b>npm i</b> command you can type the <b>npx cap build android</b> command and generate the app and install it on your device or emulator to see it working perfectly</p>
<br>
<small>The official documentation is on this site <a href="https://admob-plus.github.io/docs">on the website.</a></small>
<br>

<small style="color:green">Before starting the process below you, you find the app in this path <b>./android\app\build\outputs\apk\debug\app-debug.apk</b>
just install on your device or emulator.</small>

#### Ionic 6 + Angular + Capacitor and Admob Plus

<br>

1. Clone Project

~~~powerShell
 >git clone https://github.com/hangellorg/admob-plus-capacitor-i6.git
~~~

2. Access project folder

~~~powerShell
 >cd admob-plus-capacitor-i6\
~~~

3. Download Dependencies

~~~powerShell
 >npm i
~~~

4. Open project in text editor (command to open with vscode)

~~~powerShell
 >code .
~~~

5. In the **capacitor.config.ts** file inside the project root, change the fields


~~~typeScript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.teste.myapp', //*App id of your project
  appName: 'My App', //AppName of your App
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;

~~~

<em style="color:red"><b>*IMPORTANT:</b></em>

* <p style="color:red">AdMob doesn't work on projects with <b>io.ionic.starter</b></p>    
* <p style="color:red">The <b>appId</b> has to be the same registered in the admob. (item 5 - appID)</p>
* <p style="color:red">Apps that were just <b>created</b> in admob only worked in addmob <b>after 48 hours</b></p>
* <p style="color:red"><b>Native type ads</b> don't work in hybrid apps</p>

6. In the **ionic.config.json** file inside the project root, change the fields

~~~json
{
  "name": "Created by Hangell", //the same appName informed in item 5 appName
  "integrations": {
    "capacitor": {}
  },
  "type": "angular"
}
~~~

7. In the **package.json** file inside the project root, change the fields

~~~json
  "name": "Hangell", //the same appName informed in item 5 appName
  "version": "1.0.0", //the version
  "author": "Hangell", //the author
  "homepage": "https://hangell.org/", //your site
~~~

8. Open the terminal in the app folder (Ctrl + ' in vscode) and type

~~~powerShell
 >ionic build
~~~

9. Still in the terminal type

~~~powerShell
 >npx cap add android
~~~

10. Go to the <b>./android/app/src/main/AndroidManifest.xml</b>

<small>copy and paste the code and paste below <b>&lt;application&gt;</b>
and before <b>&lt;activity&gt;</b></small> 

<br>
<small>Change the string <b>ENTER-HERE-THE-AP-ID</b> to your admob application ID</small>
<br>

~~~xml
    <meta-data tools:replace="android:value" android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ENTER-HERE-THE-AP-ID" />

    <meta-data android:name="com.google.android.gms.ads.DELAY_APP_MEASUREMENT_INIT" android:value="true" />
~~~

* 10.1  - Still in android folder now go to Go to the <b>.\android\app\src\main\java\domain\domain-name\app-name\MainActivity.java</b>

~~~java
package org.hangell.babycoruja; //here is the name of your full application

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {}
~~~

11. Go back to the project root and now inside ***./src/app/app.component.ts*** copy and paste the code below...

<small style="color:red">IMPORTANT: If you cloned this project, step 11 and 12 already done, just change the ad block code</small>

~~~typeScript
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private platform: Platform) {
    this.initializeApp();
  }

  private async initializeApp() {
    await this.platform.ready();
  }
}

~~~

12. Go back to the project root and now inside ***./src/app/home/home.component.ts*** copy and paste the code below...

<small style="color:red">IMPORTANT: Change string ANNOUNCEMENT-BLOCK-ID-BANNER to your banner ad unit id and the string ID-BLOCK-OF-Interstitial to your Interstitial ad unit the same with ID-BLOCK-OF-Rewarded and ID-BLOCK-OF -RewardedInterstitial</small>

~~~typeScript
import { Component } from '@angular/core';
import {
  BannerAd,
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
} from '@admob-plus/capacitor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  async showBanner() {
    const banner = new BannerAd({
      adUnitId: 'ANNOUNCEMENT-BLOCK-ID-BANNER',
      position: 'top',
    });
    await banner.show();
  }

  async showInterstitialAd() {
    const interstitial = new InterstitialAd({
      adUnitId: 'ID-BLOCK-OF-Interstitial',
    });
    await interstitial.load();
    await interstitial.show();
  }

  async showRewardedAd() {
    const rewarded = new RewardedAd({
      adUnitId: 'ID-BLOCK-OF-Rewarded',
    });
    await rewarded.load();
    await rewarded.show();
  }

  async showRewardedInterstitialAd() {
    const rewarded = new RewardedInterstitialAd({
      adUnitId: 'ID-BLOCK-OF-RewardedInterstitial',
    });
    await rewarded.load();
    await rewarded.show();
  }

}
~~~

13. Before building the project, let's check if there is an error in the browser console so open the terminal in the app folder (Ctrl + ' in vscode) and type

~~~powerShell
 >ionic serve
~~~

14. Go to http://localhost:8100 and right click on the floating menu click on inspect, select the ***console*** option and click on show banner or interstitial Ad, if it displays the information as in the console below it means **it is working**, <b style="color:red">however as informed in item 5, admob ads only work on cell phones or emulators</b>. (if you are using Ionic to create a pwa to monetize the right choice is adsense and not admob)

![](https://hangell.org/wp-content/uploads/2022/04/showbanner.png)


15. Now let's generate the apk for android, open the terminal in the application folder (Ctrl + ' in vscode) and type

~~~powerShell
1º. >npx cap copy
2º. >npx cap sync
3º. >npx cap update
4º. >npx cap open android   
~~~

<small style="color:red">IMPORTANT: If you build the app and it doesn't load your changes, delete the www folder and type the command <b>ionic build</b> and redo item15
<br>
If any error occurs, it will be necessary to remove the android folder
and type the command <b>npx cap add android</b> to add the platform (If this is the case after creating go back to item 10)
</small>


16. If item 15 is executed correctly, Android Studio will open and wait for the synchronization of the packages, when it is finished, you can run it again by clicking play or build the apk in the path Build/Build Bundle(s)/APK(s)/Build APK(s) ) and generate a debug app

![](https://hangell.org/wp-content/uploads/2022/04/admobBuildAndroid.png)

17. When running the app in the simulation, the tooltip test will be on the banner

![](https://hangell.org/wp-content/uploads/2022/04/admobappfinal.png)

<small style="color:red">IMPORTANT: To view the banner you must be connected to the internet. When clicking show banner take 2-5 seconds to load the banner
</small>

18. Banner demo on smartphone

![](https://hangell.org/wp-content/uploads/2022/04/appcelular.jpeg)

<br>
<h2>Considerations</h2>

1. I recommend putting the Show Banner function in the constructor method or in ngOnInit so the banner will be initialized along with the application.
2. I recommend that you generate a service to trigger the banner.


<br>
  <h6>Help us</h6>
  <p>Add the repository to your favorites and share it with your friends</p>

<br>
  <h6>Donate</h6>
  <p>Pix: <b style="color: green;">rodrigo@hangell.org</b></p>
  <p>Cryptocurrencies or nft MetaMask: <b style="color: green;"><small>0xEd4d1be72F807Faa358C966a8eF63367c200130F</small></b></p>

![Created By](https://hangell.org/wp-content/uploads/2022/04/rodrigorangel.jpeg)
  
<a href="https://www.linkedin.com/in/rodrigo-rangel-a80810170/">Linkedin</a>

<a href="https://play.google.com/store/apps/dev?id=5606456325281613718&hl=pt">PlayStore Hangell</a>
  <a href="https://hangell.org">Site Hangell</a>
