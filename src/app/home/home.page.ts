import { Component } from '@angular/core';
import {
  BannerAd,
  InterstitialAd,
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
      adUnitId: 'ca-app-pub-2190926660800917/7281232214',
      position: 'bottom',
    });
    await banner.show();
  }

  async showInterstitialAd() {
    const interstitial = new InterstitialAd({
      adUnitId: 'ca-app-pub-2190926660800917/3183911390',
    });
    await interstitial.load();
    await interstitial.show();
  }
}
