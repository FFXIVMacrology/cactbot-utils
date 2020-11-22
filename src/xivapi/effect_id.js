import { get } from "./request.js";

const known_mapping = {
  "Thundercloud": "164",
  "Battle Litany": "786",
  "Right Eye": "1453",
  "Left Eye": "1454",
  "Meditative Brotherhood": "1182",
  "Brotherhood": "1185",
  "Embolden": "1297",
  "Technical Finish": "1822",
  "Lord of Crowns": "1876",
  "Lady of Crowns": "1877",
  "Divination": "1878",
  "The Balance": "1882",
  "The Bole": "1883",
  "The Arrow": "1884",
  "The Spear": "1885",
  "The Ewer": "1886",
  "The Spire": "1887",
  "Sword Oath": "1902",
  "Tactician": "1951",
  // This is for others, 1821 is for self.
  "Standard Finish": "2105",
  "The Wanderer's Minuet": "2216",
  "Mage's Ballad": "2217",
  "Army's Paeon": "2218",
  "Stormbite": "1201",
  "Caustic Bite": "1200",
  "Windbite": "129",
  "Venomous Bite": "124",
  "Flourishing Fan Dance": "1820",
}

export async function get_effect_id() {
  try {
    const data = await get("/Status", [
      "ID",
      "Name",
    ]);

    const resultMap = new Map();

    data.Results.forEach(element => {
      resultMap.set(element.Name, element.ID);
    });

    const requestPromises = [];
    for (let i = 2; i <= data.Pagination.PageTotal; i++) {
      requestPromises.push(get("/Status", ["ID", "Name"], i));
    }

    const allReqResults = await Promise.all(requestPromises);

    allReqResults.forEach(results => {
      results.Results.forEach(element => {
        resultMap.set(element.Name, element.ID);
      })
    })

    console.log(resultMap);

  } catch(err) {
    return Promise.reject(err);
  }
  return;
}
