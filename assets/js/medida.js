function Medida (valor,tipo)
{
    this.valor = valor;
    this.tipo = tipo || "";
    this.measures = {};
}

Medida.match = function (valor) {
  var regexp = XRegExp('^([ ]*) \n' +
                    '(?<val> [-+]?[0-9]+(\.[0-9]+)?(?:e[+-]?[0-9]+)?) # val \n' +
                    '([ ]*) \n' +
                    '(?<tip> [fckFCK]) # tip \n' +
                    '([ ]*) \n' +
                    '(?<to> (to))? # to \n' +
                    '([ ]*) \n' +
                    '(?<para> [fckFCK]) # para \n' +
                    '([ ]*)$','x');
  valor = XRegExp.exec(valor, regexp);
  return valor;
}

Medida.convertir = function(valor) {
  var measures = Medida.measures;

  var match = Medida.match(valor);
  if (match) {
    var numero = match.val,
        tipo   = match.tip,
        destino = match.para;

    try {
      var source = new measures[tipo](numero);                  // new Fahrenheit(32)
      var target = "to"+measures[destino].name;                 // "toCelsius"
      return source[target]().toFixed(2) + " "+target;          // "0 Celsius"
    }
    catch(err) {
      return 'Desconozco como convertir desde "'+tipo+'" hasta "'+destino+'"';
    }
  }
  else
    return "Introduzca una temperatura valida: 330e-1 F to C";
};
