export const COMPANY = {
  nameHe: "טרגט מוטורס",
  nameEn: "Target Motors",
  legal: "טרגט מוטורס מ.ר 2016 בע״מ",
  phoneDisplay: "077-8053655",
  phoneTel: "tel:0778053655",
  whatsapp: "972778053655",
  addressHe: "ירמיהו 68, ירושלים",
  addressEn: "68 Yirmiyahu St, Jerusalem",
  hoursHe: "א׳–ה׳ 09:00–18:00 · ו׳ 09:00–13:00",
  hoursEn: "Sun–Thu 09:00–18:00 · Fri 09:00–13:00",
  maps: "https://maps.google.com/?q=Yirmiyahu+68+Jerusalem",
  instagram: "https://www.instagram.com/targetmotors/",
  facebook: "https://www.facebook.com/targetmotorsisrael/",
};

export function whatsappHref(text: string) {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;
}
