#!/usr/bin/env python3
"""Generate char_enhance.json for all 90 Genshin characters"""
import json

# Weapon types
weapons_map = {
    "aether": "Sword", "lumine": "Sword",
    "venti": "Bow", "kazuha": "Sword", "xiao": "Polearm", "wanderer": "Catalyst",
    "faruzan": "Bow", "jean": "Sword", "sayu": "Claymore", "sucrose": "Catalyst",
    "heizou": "Catalyst", "lynnette": "Sword", "lan_yan": "Catalyst", "mizuki": "Catalyst",
    "zhongli": "Polearm", "albedo": "Sword", "itto": "Claymore", "navia": "Claymore",
    "chiori": "Sword", "gorou": "Bow", "ningguang": "Catalyst", "noelle": "Claymore",
    "yun_jin": "Polearm", "xilonen": "Sword", "kachina": "Polearm",
    "raiden": "Polearm", "yae": "Catalyst", "keqing": "Sword", "cyno": "Polearm",
    "fischl": "Bow", "kuki": "Sword", "lisa": "Catalyst", "razor": "Claymore",
    "beidou": "Claymore", "clorinde": "Sword", "sethos": "Bow", "ororon": "Bow", "variesa": "Catalyst",
    "nahida": "Catalyst", "alhaitham": "Sword", "tighnari": "Bow", "baizhu": "Catalyst",
    "kirara": "Sword", "yaoyao": "Polearm", "kaveh": "Claymore", "collei": "Bow", "emilie": "Polearm",
    "furina": "Sword", "neuvillette": "Catalyst", "yelan": "Bow", "xingqiu": "Sword",
    "kokomi": "Catalyst", "nilou": "Sword", "mona": "Catalyst", "tartaglia": "Bow",
    "ayato": "Sword", "candace": "Polearm", "barbara": "Catalyst", "mualani": "Catalyst",
    "hutao": "Polearm", "xiangling": "Polearm", "bennett": "Sword", "diluc": "Claymore",
    "klee": "Catalyst", "yoimiya": "Bow", "lyney": "Bow", "dehya": "Claymore",
    "arlecchino": "Polearm", "amber": "Bow", "xinyan": "Claymore", "yanfei": "Catalyst",
    "thoma": "Polearm", "chevreuse": "Polearm", "mavuika": "Claymore",
    "ayaka": "Sword", "ganyu": "Bow", "shenhe": "Polearm", "eula": "Claymore",
    "chongyun": "Claymore", "qiqi": "Sword", "diona": "Bow", "rosaria": "Polearm",
    "layla": "Sword", "mika": "Polearm", "freminet": "Claymore", "wriothesley": "Catalyst",
    "charlotte": "Catalyst", "citlali": "Catalyst", "capitano": "Sword", "columbina": "Catalyst"
}

# Roles
roles = {
    "venti": "Support (CC)", "kazuha": "Support", "xiao": "Main DPS", "wanderer": "Main DPS",
    "faruzan": "Support", "jean": "Healer / Support", "sayu": "Healer",
    "sucrose": "Support (EM Share)", "heizou": "Main DPS", "lynnette": "Sub-DPS",
    "lan_yan": "Shielder", "mizuki": "Healer", "zhongli": "Shielder", "albedo": "Sub-DPS",
    "itto": "Main DPS", "navia": "Main DPS", "chiori": "Sub-DPS", "gorou": "Support",
    "ningguang": "Main DPS", "noelle": "Main DPS / Healer", "yun_jin": "Support (NA DMG)",
    "xilonen": "Support", "kachina": "Sub-DPS",
    "raiden": "Main DPS / Battery", "yae": "Sub-DPS", "keqing": "Main DPS",
    "cyno": "Main DPS", "fischl": "Sub-DPS", "kuki": "Healer (Hyperbloom)",
    "lisa": "Sub-DPS", "razor": "Main DPS", "beidou": "Sub-DPS", "clorinde": "Main DPS",
    "sethos": "Main DPS", "ororon": "Sub-DPS", "variesa": "Main DPS",
    "nahida": "Sub-DPS / Support", "alhaitham": "Main DPS", "tighnari": "Main DPS",
    "baizhu": "Healer / Shielder", "kirara": "Shielder", "yaoyao": "Healer",
    "kaveh": "Main DPS", "collei": "Sub-DPS", "emilie": "Sub-DPS",
    "yelan": "Sub-DPS", "xingqiu": "Sub-DPS", "kokomi": "Healer / Driver",
    "nilou": "Support (Bloom)", "mona": "Sub-DPS / Buffer", "tartaglia": "Main DPS",
    "ayato": "Main DPS", "candace": "Support", "barbara": "Healer", "mualani": "Main DPS",
    "xiangling": "Sub-DPS", "bennett": "Healer / Buffer", "diluc": "Main DPS",
    "klee": "Main DPS", "yoimiya": "Main DPS", "lyney": "Main DPS", "dehya": "Sub-DPS",
    "arlecchino": "Main DPS", "amber": "Sub-DPS", "xinyan": "Sub-DPS", "yanfei": "Main DPS",
    "thoma": "Shielder", "chevreuse": "Support (Overload)",
    "ayaka": "Main DPS", "ganyu": "Main DPS", "shenhe": "Support (Cryo DMG)",
    "eula": "Main DPS (Physical)", "chongyun": "Sub-DPS", "qiqi": "Healer",
    "diona": "Shielder / Healer", "rosaria": "Sub-DPS", "layla": "Shielder",
    "mika": "Healer / Support", "freminet": "Main DPS", "wriothesley": "Main DPS",
    "charlotte": "Healer", "citlali": "Support", "capitano": "Main DPS", "columbina": "Sub-DPS"
}

# Best weapons by element+role patterns
def get_best_weapons(cid, element, rarity, weapon_type):
    """Generate weapon recommendations based on character profile"""
    # 5-star weapons
    five_star = []
    four_star = []
    
    # Signature / top weapons by weapon type
    sig_weapons = {
        "Sword": ["Mistsplitter Reforged", "Primordial Jade Cutter", "Freedom-Sworn", "Key of Khaj-Nisut", "Light of Foliar Incision"],
        "Claymore": ["Wolf's Gravestone", "Song of Broken Pines", "Beacon of the Reed Sea", "Redhorn Stonethresher", "Verdict"],
        "Polearm": ["Staff of Homa", "Engulfing Lightning", "Primordial Jade Winged-Spear", "Calamity Queller", "Crimson Moon's Semblance"],
        "Bow": ["Thundering Pulse", "Aqua Simulacra", "Polar Star", "The First Great Magic", "Hunter's Path"],
        "Catalyst": ["Lost Prayer to the Sacred Winds", "Skyward Atlas", "Tome of the Eternal Flow", "Cashflow Supervision", "Surf's Up"]
    }
    
    four_star_opts = {
        "Sword": ["The Alley Flash", "Lion's Roar", "Favonius Sword", "Sacrificial Sword", "Iron Sting"],
        "Claymore": ["Serpent Spine", "Archaic Petra", "Rainslasher", "Favonius Greatsword"],
        "Polearm": ["The Catch", "Dragon's Bane", "Deathmatch", "Favonius Lance", "Wavebreaker's Fin"],
        "Bow": ["Stringless", "Favonius Warbow", "Sacrificial Bow", "Rust", "Hamayumi"],
        "Catalyst": ["Widsith", "Solar Pearl", "Favonius Codex", "Sacrificial Fragments", "Prototype Amber"]
    }
    
    if cid == "aether" or cid == "lumine":
        return ["Freedom-Sworn", "Primordial Jade Cutter", "Favonius Sword", "Sacrificial Sword"]
    
    if weapon_type in sig_weapons:
        five_star = sig_weapons[weapon_type][:3]
    
    if weapon_type in four_star_opts:
        four_star = four_star_opts[weapon_type][:3]
    
    result = five_star + four_star
    return result[:6] if len(result) > 5 else result

def get_best_artifacts(cid, element, rarity, role):
    """Generate artifact recommendations"""
    artifacts = []
    
    # Elemental-specific
    elemental_sets = {
        "anemo": ["Viridescent Venerer (4)", "Desert Pavilion Chronicle (4)"],
        "geo": ["Archak Petra (4)", "Husk of Opulent Dreams (4)", "Golden Troupe (4)"],
        "electro": ["Emblem of Severed Fate (4)", "Thundering Fury (4)", "Golden Troupe (4)"],
        "dendro": ["Deepwood Memories (4)", "Gilded Dreams (4)", "Paradise Lost (4)"],
        "hydro": ["Heart of Depth (4)", "Nymph's Dream (4)", "Golden Troupe (4)", "Marechaussee Hunter (4)"],
        "pyro": ["Crimson Witch (4)", "Emblem of Severed Fate (4)", "Marechaussee Hunter (4)", "Obsidian Codex (4)"],
        "cryo": ["Blizzard Strayer (4)", "Emblem of Severed Fate (4)", "Marechaussee Hunter (4)"]
    }
    if element in elemental_sets:
        artifacts.extend(elemental_sets[element])
    
    # Role adjustments
    if "Healer" in role or "Shielder" in role:
        artifacts.append("Tenacity of Millelith (4)")
        artifacts.append("Ocean-Hued Clam (4)")
    if "Support" in role and "Shielder" not in role and "Healer" not in role:
        if cid not in ["venti", "kazuha", "sucrose", "faruzan", "zhongli", "yun_jin", "gorou"]:
            artifacts.append("Noblesse Oblige (4)")
    if "Sub-DPS" in role or "Battery" in role:
        artifacts.append("Emblem of Severed Fate (4)")
    
    return list(dict.fromkeys(artifacts))[:4]  # deduplicate, max 4

def get_main_stats(cid, element, role):
    if "Healer" in role:
        return ["HP% / HP% / Healing Bonus", "ER / HP% / HP%"]
    if "Shielder" in role:
        return ["HP% / HP% / HP%", "ER / HP% / HP%"]
    if "Support" in role and "Sub-DPS" not in role:
        return ["ER / Elemental DMG / CRIT", "ER / EM / CRIT"]
    # DPS / Sub-DPS
    return ["ATK% / Elemental DMG / CRIT", "EM / Elemental DMG / CRIT (Reaction)"]

def get_constellations(cid, rarity):
    if rarity == 4:
        return ["C1: QoL improvement", "C2: Significant DMG boost", "C4: Team support", "C6: Core power spike"]
    return ["C1: Good QoL", "C2: Strong DMG increase", "C4: Team utility", "C6: True potential unlocked"]

def get_teams(cid, element, role):
    teams = []
    if element == "anemo":
        teams.extend([f"{name} + Furina + Faruzan + Bennett", f"{name} + Xiangling + Xingqiu + Bennett (National)"])
    elif element == "geo":
        teams.extend([f"{name} + Zhongli + Albedo + Gorou", f"{name} + Furina + Xilonen + Bennett"])
    elif element == "electro":
        teams.extend([f"{name} + Nahida + Xingqiu + Kuki (Hyperbloom)", f"{name} + Fischl + Kazuha + Bennett"])
    elif element == "dendro":
        teams.extend([f"{name} + Nahida + Xingqiu + Kuki", f"{name} + Furina + Baizhu + Raiden"])
    elif element == "hydro":
        teams.extend([f"{name} + Furina + Kazuha + Baizhu", f"{name} + Xiangling + Bennett + Kazuha"])
    elif element == "pyro":
        teams.extend([f"{name} + Yelan + Xingqiu + Zhongli", f"{name} + Bennett + Kazuha + Xiangling"])
    elif element == "cryo":
        teams.extend([f"{name} + Shenhe + Kazuha + Kokomi (Freeze)", f"{name} + Furina + Charlotte + Kazuha"])
    return teams[:3]

def get_talent_priority(cid, role):
    if "Main DPS" in role:
        return ["Normal Attack ≥ Skill > Burst", "All talents recommended lv.8+"]
    if "Sub-DPS" in role:
        return ["Skill ≥ Burst > Normal Attack"]
    if "Healer" in role or "Shielder" in role:
        return ["Skill ≥ Burst > Normal Attack"]
    if "Support" in role:
        return ["Burst ≥ Skill > Normal Attack"]
    return ["Skill = Burst > Normal Attack"]

def get_materials(cid, element):
    gem_map = {"anemo": "Vayuda Turquoise", "geo": "Prithiva Topaz", "electro": "Vajrada Amethyst",
               "dendro": "Nagadus Emerald", "hydro": "Varunada Lazurite", "pyro": "Agnidus Agate",
               "cryo": "Shivada Jade"}
    gem = gem_map.get(element, "Character Gem")
    return [f"{gem}", "Local Specialty", "Common Enemy Drop", "Boss Material (World Boss)"]

def get_talent_materials(cid, element):
    return ["Teachings of [Region Book]", "Common Enemy Drop", "Weekly Boss Drop"]

def get_strengths(cid, element, role, rarity):
    strengths = []
    if rarity == 5:
        strengths.append("Strong base stats and multipliers")
    if "Main DPS" in role:
        strengths.append("Consistent on-field damage")
    if "Sub-DPS" in role:
        strengths.append("Excellent off-field damage")
    if "Support" in role:
        strengths.append("Valuable team utility")
    if "Healer" in role:
        strengths.append("Reliable sustain for any team")
    if "Shielder" in role:
        strengths.append("Provides safe play environment")
    strengths.append(f"Synergizes well within {element} teams")
    return strengths[:3]

def get_weaknesses(cid, element, role, rarity):
    weaknesses = []
    if rarity == 4:
        weaknesses.append("Lower base stats vs 5-star alternatives")
    if "Main DPS" in role:
        weaknesses.append("Requires field time")
    if "Healer" in role:
        weaknesses.append("Limited offensive contributions")
    if "Support" in role:
        weaknesses.append("Damage output is secondary")
    weaknesses.append("May need specific teammates")
    return weaknesses[:3]

# Character name mapping (short to full)
name_map = {
    "aether": "Traveler (Anemo)", "lumine": "Traveler (Lumine)", "heizou": "Shikanoin Heizou",
    "itto": "Arataki Itto", "kuki": "Kuki Shinobu", "tartaglia": "Tartaglia (Childe)",
    "raiden": "Raiden Shogun", "yae": "Yae Miko", "hutao": "Hu Tao",
    "kokomi": "Sangonomiya Kokomi", "ayato": "Kamisato Ayato", "ayaka": "Kamisato Ayaka",
    "ganyu": "Ganyu", "shenhe": "Shenhe", "bennett": "Bennett", "xiangling": "Xiangling",
    "albedo": "Albedo", "eula": "Eula", "venti": "Venti", "kazuha": "Kaedehara Kazuha",
    "xiao": "Xiao", "zhongli": "Zhongli", "nahida": "Nahida", "furina": "Furina",
    "neuvillette": "Neuvillette", "wanderer": "Wanderer", "mavuika": "Mavuika",
    "arlecchino": "Arlecchino", "lyney": "Lyney", "clorinde": "Clorinde",
    "chiori": "Chiori", "navia": "Navia", "xilonen": "Xilonen",
    "yelan": "Yelan", "nilou": "Nilou", "mona": "Mona",
    "keqing": "Keqing", "cyno": "Cyno", "diluc": "Diluc",
    "dehya": "Dehya", "yoimiya": "Yoimiya", "tighnari": "Tighnari",
    "alhaitham": "Alhaitham", "baizhu": "Baizhu", "emilie": "Emilie",
    "variesa": "Varesa", "mualani": "Mualani", "mizuki": "Mizuki",
    "citlali": "Citlali", "capitano": "Capitano", "columbina": "Columbina",
    "wriothesley": "Wriothesley", "freminet": "Freminet", "charlotte": "Charlotte",
    "chevreuse": "Chevreuse", "ororon": "Ororon", "sethos": "Sethos",
    "layla": "Layla", "mika": "Mika", "rosaria": "Rosaria",
    "diona": "Diona", "chongyun": "Chongyun", "qiqi": "Qiqi",
    "noelle": "Noelle", "ningguang": "Ningguang", "gorou": "Gorou",
    "yun_jin": "Yun Jin", "kachina": "Kachina", "faruzan": "Faruzan",
    "jean": "Jean", "sayu": "Sayu", "sucrose": "Sucrose",
    "lynnette": "Lynnette", "lan_yan": "Lan Yan", "heizou": "Heizou",
    "albedo": "Albedo", "beidou": "Beidou", "fischl": "Fischl",
    "kuki": "Kuki Shinobu", "lisa": "Lisa", "razor": "Razor",
    "candace": "Candace", "barbara": "Barbara", "xingqiu": "Xingqiu",
    "thoma": "Thoma", "xinyan": "Xinyan", "yanfei": "Yanfei", "amber": "Amber",
    "collei": "Collei", "kaveh": "Kaveh", "kirara": "Kirara", "yaoyao": "Yaoyao",
    "gorou": "Gorou", "sethos": "Sethos"
}

# Build the full dataset
with open('/Users/apple2/.openclaw/workspace/genshin-wiki-site/char_simple.json') as f:
    chars = json.load(f)

output = {}
for c in chars:
    cid = c['id']
    name = c['name']
    element = c['element']
    rarity = c['rarity']
    weapon_type = weapons_map.get(cid, "Sword")
    role = roles.get(cid, "Main DPS")
    
    entry = {
        "role": role,
        "weapon": weapon_type,
        "element": element,
        "rarity": rarity,
        "best_weapons": get_best_weapons(cid, element, rarity, weapon_type),
        "best_artifacts": get_best_artifacts(cid, element, rarity, role),
        "main_stats": get_main_stats(cid, element, role),
        "constellation_priority": get_constellations(cid, rarity),
        "best_teams": get_teams(cid, name, role),
        "talent_priority": get_talent_priority(cid, role),
        "ascension_materials": get_materials(cid, element),
        "talent_materials": get_talent_materials(cid, element),
        "strengths": get_strengths(cid, element, role, rarity),
        "weaknesses": get_weaknesses(cid, element, role, rarity)
    }
    output[cid] = entry

# Merge with existing data (prefer hand-crafted data)
existing_path = '/Users/apple2/.openclaw/workspace/genshin-wiki-site/char_enhance.json'
try:
    with open(existing_path) as f:
        existing = json.load(f)
    for cid in existing:
        output[cid] = existing[cid]
    print(f"Merged with {len(existing)} manually crafted entries")
except:
    pass

with open(existing_path, 'w') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"Generated data for {len(output)} characters")
print(f"Weapons: {len(set(weapons_map.values()))} types")
print(f"Elements: {len(set(c['element'] for c in chars))} types")
