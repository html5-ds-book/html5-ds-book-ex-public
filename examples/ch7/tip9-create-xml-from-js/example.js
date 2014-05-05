;(function() {

  var doc = document.implementation.createDocument("","root", null),
      node = doc.createElement("someNode");
  doc.documentElement.appendChild(node);

  document.getElementById('first')
        .appendChild(
          document.createTextNode(
            new XMLSerializer()
              .serializeToString(doc)));

  var kml = document.getElementById('test');
 //todo move to common anc clear up
  document.getElementById('second')
        .appendChild(
          document.createTextNode(
            new XMLSerializer()
              .serializeToString(kml)));
}());
