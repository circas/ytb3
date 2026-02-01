// YouTube ALL-IN-ONE
// Ads 제거 + PiP + Background Playback


if (!$response.body) {
  $done({});
  return;
}

let obj = JSON.parse($response.body);

try {

  /* =========================
     1. REKLAMLARI TEMİZLE
  ========================== */
  if (obj.adPlacements) delete obj.adPlacements;
  if (obj.playerAds) delete obj.playerAds;
  if (obj.adBreakHeartbeatParams) delete obj.adBreakHeartbeatParams;

  if (obj.streamingData && obj.streamingData.adaptiveFormats) {
    obj.streamingData.adaptiveFormats =
      obj.streamingData.adaptiveFormats.filter(f => !f.hasOwnProperty("drmFamilies"));
  }

  /* =========================
     2. BACKGROUND PLAY
  ========================== */
  if (obj.playabilityStatus) {
    obj.playabilityStatus.backgroundPlayable = true;
  }

  if (obj.playerConfig) {
    obj.playerConfig.isBackgroundPlaybackEnabled = true;
  }

  if (obj.audioOnlyPlayability) {
    obj.audioOnlyPlayability.audioOnlyPlayabilityStatus =
      "AUDIO_ONLY_PLAYABILITY_STATUS_PLAYABLE";
  }

  /* =========================
     3. PiP AKTİF ET
  ========================== */
  if (!obj.miniPlayer) obj.miniPlayer = {};
  obj.miniPlayer.active = true;

  if (!obj.playbackTracking) obj.playbackTracking = {};

  if (obj.videoDetails) {
    obj.videoDetails.isLiveContent = false;
  }

} catch (e) {
  // sessiz geç
}

$done({ body: JSON.stringify(obj) });

