const soapRequest = require('../index');
const fs = require('fs');
const { expect } = require('chai');

const url = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php';
const headers = {
  'user-agent': 'easy-soap-request-test',
  'Content-Type': 'text/xml;charset=UTF-8',
  SOAPAction: 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
};
const xml = fs.readFileSync('test/zipCodeEnvelope.xml', 'utf-8');
const xmlFail = fs.readFileSync('test/zipCodeEnvelopeFail.xml', 'utf-8');

describe('Test Longitude/Latitude SOAP Request', () => {
  const coordinates = '32.9612,-96.8372';
  it(`Zip Code 75001 should return ${coordinates}`, async () => {
    const { response } = await soapRequest(url, headers, xml);
    expect(response.body).to.include(coordinates);
    expect(response.statusCode).to.be.equal(200);
  });
  it('Should catch Promise Rejection', async () => {
    try {
      const { response } = await soapRequest('fail', headers, xmlFail);
      expect(response.statusCode).to.not.be.equal(200);
    } catch (e) {
      // Test promise rejection for coverage
    }
  });
});
