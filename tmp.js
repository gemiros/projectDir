function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("vue-gas-app")
    .addMetaTag("viewport", "width=device-width, initial-scale=0.1");
};

function doGetAllTmp(){
  const ss = SpreadsheetApp.openById(
    "13A1cUGSHFT9KA2OFOJqWVOIEKfU9jHaQp4RYLvJvjaw"
  );
  const monsterDB = ss.getSheetByName("monsterTmp");
  let data = monsterDB.getDataRange().getValues();
  data.shift();
  return data;
};

function doSetMonster(data) {
  const ss = SpreadsheetApp.openById(
    "13A1cUGSHFT9KA2OFOJqWVOIEKfU9jHaQp4RYLvJvjaw"
  );
  const monsterDB = ss.getSheetByName("monsterTmp");
  var lastRow = monsterDB.getLastRow();
  const range = monsterDB.getRange(lastRow + 1, 1, 1, data.length);
  try {
    range.setValues([data]);
    return "success";
  } catch (error) {
    return error.message;
  }
};

function doEditMonster (data, id){
  const ss = SpreadsheetApp.openById(
    "13A1cUGSHFT9KA2OFOJqWVOIEKfU9jHaQp4RYLvJvjaw"
  );
  const monsterDB = ss.getSheetByName("monsterTmp");
  const range = monsterDB.getRange(Number(id) + 2, 1, 1, data.length);
  try {
    range.setValues([data]);
    return "success";
  } catch (error) {
    return error.message;
  }
};
