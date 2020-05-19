exports.statusEnum = Object.freeze({
  ASIGNADA: 'ASIGNADA', 
  EN_REVISION: 'EN_REVISION',
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