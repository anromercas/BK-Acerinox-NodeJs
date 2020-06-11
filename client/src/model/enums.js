//////////////////////checklistInstanceEnums//////////////////////////
exports.statusEnum = Object.freeze({
  ASIGNADA: 'ASIGNADA', 
  A_REVISAR: 'A_REVISAR',
  OK: 'OK',
  NOK: 'NOK'
});
exports.statusEnumDefault = this.statusEnum.ASIGNADA;
exports.subTypeEnum = Object.freeze({
  PUNTUAL: 'PUNTUAL',
  PUNTUAL_ALEATORIA: 'PUNTUAL_ALEATORIA',
  PUNTUAL_SEMANAL: 'PUNTUAL_SEMANAL',
  PUNTUAL_MENSUAL: 'PUNTUAL_MENSUAL',
  SEMANAL: 'SEMANAL',
  MENSUAL: 'MENSUAL' 
});
exports.subTypeEnumDefault = this.subTypeEnum.PUNTUAL;
exports.lineTypeEnum = Object.freeze({
  FREE_LINE: 'FREE_LINE',
  FIXED_LINE: 'FIXED_LINE'
});
exports.lineTypeEnumDefault = this.lineTypeEnum.FIXED_LINE;
/////////////////////////checklistEnums.js////////////////////////////////
exports.typeEnum = Object.freeze({
  CHECKLIST: 'CHECKLIST',
  OPS: 'OPS'
});
exports.typeEnumDefault = this.typeEnum.CHECKLIST;
//////////////////////////////////////////////////////////////////////////