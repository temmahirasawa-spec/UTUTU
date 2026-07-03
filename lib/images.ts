// 画像メタとマッピング
// すべて静的 import → next/image が blurDataURL と寸法を自動生成（CLS 防止）
import type { StaticImageData } from 'next/image';

// ── brand assets (実ファイルを view して被写体で割り当て済み) ──
import fromaHero from '@/public/images/brands/froma/hero.jpg';
import fromaInterior from '@/public/images/brands/froma/interior.jpg';
import fromaSignage from '@/public/images/brands/froma/signage.jpg';
import fromaFoodSpread from '@/public/images/brands/froma/food-spread.jpg';
import fromaPizza from '@/public/images/brands/froma/pizza.jpg';
import fromaBurrata from '@/public/images/brands/froma/burrata.jpg';

import brunchExterior from '@/public/images/brands/yorkys-brunch/exterior.jpg';
import brunchHero from '@/public/images/brands/yorkys-brunch/hero.jpg';
import brunchCup from '@/public/images/brands/yorkys-brunch/cup.jpg';
import brunchFrontKv from '@/public/images/brands/yorkys-brunch/front-kv.jpg'; // 木彫りロゴの入口（指定画像）

import creperieStore01 from '@/public/images/brands/yorkys-creperie/store-01.jpg';
import creperieStore02 from '@/public/images/brands/yorkys-creperie/store-02.jpg';
import creperieStore03 from '@/public/images/brands/yorkys-creperie/store-03.jpg';
import creperieHero from '@/public/images/brands/yorkys-creperie/hero.jpg';
import creperieProducts from '@/public/images/brands/yorkys-creperie/products.jpg';
import creperieFrontKv from '@/public/images/brands/yorkys-creperie/front-kv.jpg'; // 名古屋リニューアル ファサード

import entKv from '@/public/images/brands/yorkys-entertainment/kv.jpg'; // ENTERTAINMENT キービジュアル

import madeYokohama from '@/public/images/brands/mademoiselle-croquette/02.jpg';
import madeLogo from '@/public/images/brands/mademoiselle-croquette/01.jpg';

import pobHero from '@/public/images/brands/piece-of-bake/hero.jpg';
import pobStoreExterior from '@/public/images/brands/piece-of-bake/store-exterior.jpg';
import pobStoreInterior from '@/public/images/brands/piece-of-bake/store-interior.jpg';
import pobDonuts from '@/public/images/brands/piece-of-bake/donuts-lineup.jpg';

import topCrepeInHand from '@/public/images/brands/top.jpg';
import topKv from '@/public/images/top/kv.jpg'; // トップ KV（PIECE OF BAKE カウンター / ネオン）

export const IMG = {
  fromaHero,
  fromaInterior,
  fromaSignage,
  fromaFoodSpread,
  fromaPizza,
  fromaBurrata,
  brunchExterior,
  brunchHero,
  brunchCup,
  brunchFrontKv,
  creperieStore01,
  creperieStore02,
  creperieStore03,
  creperieHero,
  creperieProducts,
  creperieFrontKv,
  entKv,
  madeYokohama,
  madeLogo,
  pobHero,
  pobStoreExterior,
  pobStoreInterior,
  pobDonuts,
  topCrepeInHand,
} as const;

// ── HERO 背景: PIECE OF BAKE のカウンター（ネオンサイン「PIECE OF Bake.」） ──
export const HERO_IMAGE: StaticImageData = topKv;

export type WorkImage = { src: StaticImageData; alt: string };

// ── WORKS STAGE × 6（各ブランドの代表ビジュアル / 縦横混在） ──
export const WORKS_GALLERY: WorkImage[] = [
  { src: brunchHero, alt: 'YORKYS BRUNCH の明るい店内 — 西宮' },
  { src: creperieProducts, alt: 'YORKYS Creperie のクレープを掲げる三つの手' },
  { src: madeYokohama, alt: 'Mademiselle Croquette × 横浜ランドマークタワー' },
  { src: pobHero, alt: 'Piece of Bake のドーナツとブランドグラフィック' },
  { src: creperieHero, alt: 'YORKYS Creperie 3種クレープのブランドビジュアル' },
  { src: pobStoreExterior, alt: 'Piece of Bake / YORKYS のカウンター外観' },
];

// ── Why Choose Us — bento large card（人の手・温度を感じる商品ショット） ──
export const WHY_HERO_IMAGE: StaticImageData = topCrepeInHand;
