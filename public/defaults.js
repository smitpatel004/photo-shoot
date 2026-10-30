/* Default content shown until the owner adds real photos/videos from /admin.
   Any field left empty in the admin falls back to these values. */
window.SITE_DEFAULTS = {
  business: {
    name: "Kesar Frames",
    tagline: "Rajkot · Est. 2014",
    phone: "+91 98250 47312",
    email: "hello@kesarframes.in",
    address: "2nd floor, Shivam Arcade, Kalawad Road, Rajkot 360005",
    price_wedding: "₹1,45,000",
    price_pre: "₹55,000",
    price_photo: "₹95,000"
  },
  slots: [
    { id: "hero1", label: "Hero frame 1 (big)", hint: "Top of the page, large left frame" },
    { id: "hero2", label: "Hero frame 2", hint: "Top of the page, small top-right frame" },
    { id: "hero3", label: "Hero frame 3", hint: "Top of the page, small bottom-right frame" },
    { id: "svc1", label: "Wedding Films card", hint: "Services section, first card" },
    { id: "svc2", label: "Pre-wedding card", hint: "Services section, second card" },
    { id: "svc3", label: "Photography card", hint: "Services section, third card" },
    { id: "reel", label: "Showreel (video works best)", hint: "Full-screen section that grows as you scroll" },
    { id: "book", label: "Contact background", hint: "Behind the Book Now section" }
  ],
  albums: [
    { id: "a1", t: "Riya & Harsh", loc: "Imperial Palace, Rajkot", cat: "wedding", scene: 3, n: 12, size: "tall" },
    { id: "a2", t: "Salt & Sunrise", loc: "Rann of Kutch", cat: "pre", scene: 0, n: 9, size: "wide" },
    { id: "a3", t: "Haldi at Home", loc: "Gondal", cat: "ritual", scene: 5, n: 8, size: "" },
    { id: "a4", t: "Sea Vows", loc: "Dwarka coast", cat: "pre", scene: 4, n: 10, size: "" },
    { id: "a5", t: "Garba Sangeet", loc: "Jamnagar", cat: "wedding", scene: 2, n: 14, size: "wide" },
    { id: "a6", t: "Rose Mehendi", loc: "Morbi", cat: "ritual", scene: 7, n: 7, size: "tall" },
    { id: "a7", t: "Forest Light", loc: "Polo Forest, Idar", cat: "pre", scene: 6, n: 9, size: "" },
    { id: "a8", t: "Lantern Vidaai", loc: "Bhavnagar", cat: "wedding", scene: 1, n: 11, size: "" }
  ]
};
