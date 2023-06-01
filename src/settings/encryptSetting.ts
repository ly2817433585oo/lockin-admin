// 加密相关设置
import { isDevMode } from "@/utils/env";

export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7; // 7day

// ase encryption key
export const cacheCipher = {
  key: "_11111000001111@",
  iv: "@11111000001111_",
};

export const enableStorageEncryption = !isDevMode();
