import { settings } from '../settings';

const restoreOptions = async () => {
  const { blockAds } = await settings.getItems({
    blockAds: true
  });
  (document.getElementById('block_ads') as any).checked = blockAds;
};

const saveOptions = async () => {
  const blockAds = (document.getElementById('block_ads') as any).checked;

  await settings.setItems({ blockAds });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save')?.addEventListener('click', saveOptions);
