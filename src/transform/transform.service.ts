import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as xslt4node from 'xslt4node';

@Injectable()
export class TransformService {
  transform(): Promise<string> {
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="efatura.xslt"?>
<Invoice
	xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
	xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
	xmlns:xades="http://uri.etsi.org/01903/v1.3.2#"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"
	xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
	xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
	<ext:UBLExtensions>
		<ext:UBLExtension>
			<ext:ExtensionContent />
		</ext:UBLExtension>
	</ext:UBLExtensions>
	<cbc:UBLVersionID>2.1</cbc:UBLVersionID>
	<cbc:CustomizationID>TR1.2</cbc:CustomizationID>
	<cbc:ProfileID>EARSIVFATURA</cbc:ProfileID>
	<cbc:ID>AA92025000000202</cbc:ID>
	<cbc:CopyIndicator>false</cbc:CopyIndicator>
	<cbc:UUID>e01ed100-a500-4431-a33f-a6cd0cc39fa1</cbc:UUID>
	<cbc:IssueDate>2025-07-14</cbc:IssueDate>
	<cbc:IssueTime>01:04:42</cbc:IssueTime>
	<cbc:InvoiceTypeCode>SATIS</cbc:InvoiceTypeCode>
	<cbc:Note>Yalnız Yüz Kırk Dokuz TL</cbc:Note>
	<cbc:Note>Ödeme Şekli : Nakit</cbc:Note>	
	<cbc:Note>Masraf merkezi kodu: M01001</cbc:Note>
	<cbc:Note>Mağaza adı: ADANA İNÖNÜ CADDE</cbc:Note>
	<cbc:Note>Çınarlı Mah. İnönü Caddesi No:16/A 
 ADANA</cbc:Note>
	<cbc:Note>Mesul Müdür : ERTUĞRUL AKDUMAN</cbc:Note>
	<cbc:Note>Optisyenlik Müessesesi Ruhsatname Tarih/Sayısı: 10.2.2025/A1905</cbc:Note>
	<cbc:Note>Optisyen Diploma Tarih/Sayısı: 3.2.2025/ERTU</cbc:Note>
	<cbc:Note>Müşteri Kodu : M007898155</cbc:Note>
	<cbc:DocumentCurrencyCode>TRY</cbc:DocumentCurrencyCode>
	<cbc:PricingCurrencyCode>TRY</cbc:PricingCurrencyCode>
	<cbc:LineCountNumeric>1</cbc:LineCountNumeric>
	<cac:AdditionalDocumentReference>
		<cbc:ID>gonderimSekli</cbc:ID>
		<cbc:IssueDate>2024-08-08</cbc:IssueDate>
		<cbc:DocumentType>KAGIT</cbc:DocumentType>
	</cac:AdditionalDocumentReference>
	<cac:Signature>
		<cbc:ID schemeID="VKN_TCKN">4550329191</cbc:ID>
		<cac:SignatoryParty>
			<cac:PartyIdentification>
				<cbc:ID schemeID="VKN">4550329191</cbc:ID>
			</cac:PartyIdentification>
			<cac:PartyName>
				<cbc:Name>ATASUN OPTİK PERAKENDE TİCARET A.Ş</cbc:Name>
			</cac:PartyName>
			<cac:PostalAddress>
				<cbc:StreetName>Esentepe Mah. Keskin Kalem Sok. No:5</cbc:StreetName>
				<cbc:BuildingName>.</cbc:BuildingName>
				<cbc:BuildingNumber>.</cbc:BuildingNumber>
				<cbc:CitySubdivisionName>Şişli</cbc:CitySubdivisionName>
				<cbc:CityName>İSTANBUL</cbc:CityName>
				<cbc:PostalZone>34394</cbc:PostalZone>
				<cac:Country>
					<cbc:IdentificationCode>TR</cbc:IdentificationCode>
					<cbc:Name>TÜRKİYE</cbc:Name>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyTaxScheme>
				<cac:TaxScheme>
					<cbc:Name>BOĞAZİÇİ KURUMLAR</cbc:Name>
				</cac:TaxScheme>
			</cac:PartyTaxScheme>
			<cac:Contact>
				<cbc:Telephone>0212 347 44 74</cbc:Telephone>
				<cbc:Telefax>0212 347 44 75</cbc:Telefax>
				<cbc:ElectronicMail>faturalar@atasunoptik.com.tr</cbc:ElectronicMail>
			</cac:Contact>
		</cac:SignatoryParty>
		<cac:DigitalSignatureAttachment>
			<cac:ExternalReference>
				<cbc:URI>#Signature</cbc:URI>
			</cac:ExternalReference>
		</cac:DigitalSignatureAttachment>
	</cac:Signature>
	<cac:AccountingSupplierParty>
		<cac:Party>
			<cbc:WebsiteURI>www.atasunoptik.com.tr</cbc:WebsiteURI>
			<cac:PartyIdentification>
				<cbc:ID schemeID="VKN">4550329191</cbc:ID>
			</cac:PartyIdentification>
			<cac:PartyIdentification>
				<cbc:ID schemeID="MERSISNO">0455032919100010</cbc:ID>
			</cac:PartyIdentification>
			<cac:PartyIdentification>
				<cbc:ID schemeID="TICARETSICILNO">641790</cbc:ID>
			</cac:PartyIdentification>
			<cac:PartyName>
				<cbc:Name>ATASUN OPTİK PERAKENDE TİCARET A.Ş</cbc:Name>
			</cac:PartyName>
			<cac:PostalAddress>
				<cbc:StreetName>Esentepe Mah. Keskin Kalem Sok. No:5</cbc:StreetName>
				<cbc:BuildingName>.</cbc:BuildingName>
				<cbc:BuildingNumber>.</cbc:BuildingNumber>
				<cbc:CitySubdivisionName>Şişli</cbc:CitySubdivisionName>
				<cbc:CityName>İSTANBUL</cbc:CityName>
				<cbc:PostalZone>34394</cbc:PostalZone>
				<cac:Country>
					<cbc:IdentificationCode>TR</cbc:IdentificationCode>
					<cbc:Name>TÜRKİYE</cbc:Name>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyTaxScheme>
				<cac:TaxScheme>
					<cbc:Name>BOĞAZİÇİ KURUMLAR</cbc:Name>
				</cac:TaxScheme>
			</cac:PartyTaxScheme>
			<cac:Contact>
				<cbc:Telephone>0212 347 44 74</cbc:Telephone>
				<cbc:Telefax>0212 347 44 75</cbc:Telefax>
				<cbc:ElectronicMail>faturalar@atasunoptik.com.tr</cbc:ElectronicMail>
			</cac:Contact>
		</cac:Party>
	</cac:AccountingSupplierParty>
	<cac:AccountingCustomerParty>
		<cac:Party>
			<cac:PartyIdentification>
				<cbc:ID schemeID="TCKN">66850593192</cbc:ID>
			</cac:PartyIdentification>
			<cac:PartyName>
				<cbc:Name>AKAY HASAN</cbc:Name>
			</cac:PartyName>
			<cac:PostalAddress>
				<cbc:StreetName>Dereköy Mah</cbc:StreetName>
				<cbc:BuildingNumber>.</cbc:BuildingNumber>
				<cbc:CitySubdivisionName>Yenipazar / Aydın</cbc:CitySubdivisionName>
				<cbc:CityName>AYDIN</cbc:CityName>
				<cac:Country>
					<cbc:Name>#CUST_CONTRY_NAME#</cbc:Name>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyTaxScheme>
				<cac:TaxScheme>
					<cbc:Name></cbc:Name>
				</cac:TaxScheme>
			</cac:PartyTaxScheme>
      <cac:Contact>
        <cbc:Telephone></cbc:Telephone>
        <cbc:ElectronicMail></cbc:ElectronicMail>
      </cac:Contact>      
			<cac:Person>
				<cbc:FirstName>HASAN</cbc:FirstName>
				<cbc:FamilyName>AKAY</cbc:FamilyName>
			</cac:Person>
		</cac:Party>
	</cac:AccountingCustomerParty>
	<cac:AllowanceCharge>
		<cbc:ChargeIndicator>false</cbc:ChargeIndicator>
		<cbc:Amount currencyID="TRY">0.00</cbc:Amount>
	</cac:AllowanceCharge>	
	<cac:PricingExchangeRate>
		<cbc:SourceCurrencyCode>TRY</cbc:SourceCurrencyCode>
		<cbc:TargetCurrencyCode>TRY</cbc:TargetCurrencyCode>
		<cbc:CalculationRate>1.0000</cbc:CalculationRate>
	</cac:PricingExchangeRate>
	<cac:TaxTotal>
		<cbc:TaxAmount currencyID="TRY">22.73</cbc:TaxAmount>
				<cac:TaxSubtotal>
			<cbc:TaxableAmount currencyID="TRY">126.27</cbc:TaxableAmount>
			<cbc:TaxAmount currencyID="TRY">22.73</cbc:TaxAmount>
			<cbc:Percent>18.00</cbc:Percent>
			<cac:TaxCategory>
				<cac:TaxScheme>
					<cbc:Name>Satış</cbc:Name>
					<cbc:TaxTypeCode>0015</cbc:TaxTypeCode>
				</cac:TaxScheme>
			</cac:TaxCategory>
		</cac:TaxSubtotal>
	</cac:TaxTotal>
	<cac:LegalMonetaryTotal>
		<cbc:LineExtensionAmount currencyID="TRY">149.00</cbc:LineExtensionAmount>
		<cbc:TaxExclusiveAmount currencyID="TRY">126.27</cbc:TaxExclusiveAmount>
		<cbc:TaxInclusiveAmount currencyID="TRY">149.00</cbc:TaxInclusiveAmount>
    <cbc:AllowanceTotalAmount currencyID="TRY">0.00</cbc:AllowanceTotalAmount>
		<cbc:PayableAmount currencyID="TRY">149.00</cbc:PayableAmount>
	</cac:LegalMonetaryTotal>
		<cac:InvoiceLine>
		<cbc:ID>1</cbc:ID>
		<cbc:InvoicedQuantity unitCode="NIU">1</cbc:InvoicedQuantity>
		<cbc:LineExtensionAmount currencyID="TRY">149.00</cbc:LineExtensionAmount>
		<cac:AllowanceCharge>
			<cbc:ChargeIndicator>false</cbc:ChargeIndicator>
			<cbc:AllowanceChargeReason>İskonto</cbc:AllowanceChargeReason>
			<cbc:Amount currencyID="TRY">0.00</cbc:Amount>
		</cac:AllowanceCharge>
		<cac:TaxTotal>
			<cbc:TaxAmount currencyID="TRY">22.73</cbc:TaxAmount>
			<cac:TaxSubtotal>
				<cbc:TaxableAmount currencyID="TRY">126.27</cbc:TaxableAmount>
				<cbc:TaxAmount currencyID="TRY">22.73</cbc:TaxAmount>
				<cbc:Percent>18.00</cbc:Percent>
				<cac:TaxCategory>
					<cac:TaxScheme>
						<cbc:Name>Satış</cbc:Name>
						<cbc:TaxTypeCode>0015</cbc:TaxTypeCode>
					</cac:TaxScheme>
				</cac:TaxCategory>
			</cac:TaxSubtotal>
		</cac:TaxTotal>
		<cac:Item>
			<cbc:Description />
			<cbc:Name>GÜNEŞ GÖZLÜĞÜ C.HERRERA 6 R80 56</cbc:Name>
			<cac:BuyersItemIdentification>
				<cbc:ID>GU001982</cbc:ID>
			</cac:BuyersItemIdentification>
			<cac:SellersItemIdentification>
				<cbc:ID>GU001982</cbc:ID>
			</cac:SellersItemIdentification>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="TRY">149.00</cbc:PriceAmount>
		</cac:Price>
	</cac:InvoiceLine>
</Invoice>`;

    const xsltString = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
                xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
                xmlns:ccts="urn:un:unece:uncefact:documentation:2"
                xmlns:clm54217="urn:un:unece:uncefact:codelist:specification:54217:2001"
                xmlns:clm5639="urn:un:unece:uncefact:codelist:specification:5639:1988"
                xmlns:clm66411="urn:un:unece:uncefact:codelist:specification:66411:2001"
                xmlns:clmIANAMIMEMediaType="urn:un:unece:uncefact:codelist:specification:IANAMIMEMediaType:2003"
                xmlns:fn="http://www.w3.org/2005/xpath-functions"
                xmlns:link="http://www.xbrl.org/2003/linkbase"
                xmlns:n1="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
                xmlns:qdt="urn:oasis:names:specification:ubl:schema:xsd:QualifiedDatatypes-2"
                xmlns:udt="urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2"
                xmlns:xbrldi="http://xbrl.org/2006/xbrldi"
                xmlns:xbrli="http://www.xbrl.org/2003/instance"
                xmlns:xdt="http://www.w3.org/2005/xpath-datatypes"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                exclude-result-prefixes="cac cbc ccts clm54217 clm5639 clm66411 clmIANAMIMEMediaType fn link n1 qdt udt xbrldi xbrli xdt xlink xs xsd xsi"
                xmlns:msxsl="urn:schemas-microsoft-com:xslt">
  <xsl:decimal-format name="european" decimal-separator="," grouping-separator="." NaN=""/>
  <xsl:output version="4.0" method="html" indent="no" encoding="UTF-8" doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN" doctype-system="http://www.w3.org/TR/html4/loose.dtd"/>
  <xsl:param name="SV_OutputFormat" select="'HTML'"/>
  <xsl:variable name="XML" select="/"/>
  <xsl:variable name="linePerPage" select="15"></xsl:variable>
  <xsl:variable name="legalMonetary">
    <xsl:choose>
      <xsl:when test="n1:Invoice/cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount!=''">
        <xsl:value-of select="n1:Invoice/cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="number(0)"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <xsl:variable name ="linediscount" select="sum(n1:Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:Amount)"></xsl:variable>
  <xsl:variable name="control">
    <xsl:choose>
      <xsl:when test="n1:Invoice/cbc:ProfileID='IHRACAT'">1</xsl:when>
      <xsl:otherwise>0</xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <xsl:template match="/">
    <html>
      <head>
        
        <script type="text/javascript">
          <![CDATA[var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(1&d>>e);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}for(var e=0;15>e;e++){var g=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;h>0;h-=2)for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(1&a[g]>>>e));var k=f.getMask(b,d,h-i);k&&(j=!j),this.modules[d][h-i]=j,e--,-1==e&&(g++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4),g.put(i.getLength(),f.getLengthInBits(i.mode,a)),i.write(g)}for(var l=0,h=0;h<e.length;h++)l+=e[h].dataCount;if(g.getLengthInBits()>8*l)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*l+")");for(g.getLengthInBits()+4<=8*l&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);for(;;){if(g.getLengthInBits()>=8*l)break;if(g.put(b.PAD0,8),g.getLengthInBits()>=8*l)break;g.put(b.PAD1,8)}return b.createBytes(g,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,g=new Array(b.length),h=new Array(b.length),j=0;j<b.length;j++){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),e=Math.max(e,l),g[j]=new Array(k);for(var m=0;m<g[j].length;m++)g[j][m]=255&a.buffer[m+c];c+=k;var n=f.getErrorCorrectPolynomial(l),o=new i(g[j],n.getLength()-1),p=o.mod(n);h[j]=new Array(n.getLength()-1);for(var m=0;m<h[j].length;m++){var q=m+p.getLength()-h[j].length;h[j][m]=q>=0?p.get(q):0}}for(var r=0,m=0;m<b.length;m++)r+=b[m].totalCount;for(var s=new Array(r),t=0,m=0;d>m;m++)for(var j=0;j<b.length;j++)m<g[j].length&&(s[t++]=g[j][m]);for(var m=0;e>m;m++)for(var j=0;j<b.length;j++)m<h[j].length&&(s[t++]=h[j][m]);return s};for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;b>d;d++)a.isDark(d,e)&&k++;var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e},j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};var l=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],o=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function g(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var b=this._htOption,c=this._el,d=a.getModuleCount();Math.floor(b.width/d),Math.floor(b.height/d),this.clear();var h=g("svg",{viewBox:"0 0 "+String(d)+" "+String(d),width:"100%",height:"100%",fill:b.colorLight});h.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),c.appendChild(h),h.appendChild(g("rect",{fill:b.colorDark,width:"1",height:"1",id:"template"}));for(var i=0;d>i;i++)for(var j=0;d>j;j++)if(a.isDark(i,j)){var k=g("use",{x:String(i),y:String(j)});k.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),h.appendChild(k)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},a}(),p="svg"===document.documentElement.tagName.toLowerCase(),q=p?o:m()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function d(a,b){var c=this;if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};return d.onabort=e,d.onerror=e,d.onload=f,d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",void 0}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}if(this._android&&this._android<=2.1){var b=1/window.devicePixelRatio,c=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(a,d,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*b;else"undefined"==typeof j&&(arguments[1]*=b,arguments[2]*=b,arguments[3]*=b,arguments[4]*=b);c.apply(this,arguments)}}var e=function(a,b){this._bIsPainted=!1,this._android=n(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&d.call(this,a)},e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];"string"==typeof a&&(a=document.getElementById(a)),this._android=n(),this._el=a,this._oQRCode=null,this._oDrawing=new q(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(r(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=d}();]]>
                                </script>
                                
                                <style type="text/css">
                                  body {background-color: #FFFFFF;font-family: Calibri !important;font-size: 11px;color: #666666;margin:0px}
                                  #container{padding-left:30px;padding-right:30px;width:800px;height:1040px;border-spacing: 0px;font-size: 11px;}
                                  .containerTr{float:left;border-spacing: 0px;font-size: 11px;}
                                  .invoiceLineMainTr{margin-top: 3px;float:left;border-spacing: 0px;font-size: 11px;}
                                  #invoiceTop{width:800px;font-size: 11px;}
                                  .capital{text-transform:capitalize;font-size: 11px;}
                                  .lower{text-transform:lowercase;font-size: 11px;}
                                  .invoiceCompany{width:800px;font-size: 11px;}
                                  .companyLogo{width:175px;font-size: 11px;}
                                  .companyInfo{width:520px;font-size: 11px;}
                                  #companyInfoUl{list-style-type:none;padding: 0px;font-size: 11px;}
                                  #companyInfoUl li{float:left;padding-top: 5px;padding-left: 25px;font-size: 11px;}
                                  .companyAdres{width:100% !important;text-transform:capitalize;font-size: 11px;}
                                  .companyNameLineTbl{height:40px;width:800px;background:black;border: none;font-size: 11px;border-spacing: 0px;}
                                  .companyNameColor{width:10px;background:#E38F15;height: 40px;font-size: 11px;}
                                  .companyNameP{color: #FFF;font-weight: bold;font-size: 17px;padding-left: 10px;}
                                  .invoiceInfo{width:800px;font-size: 11px;}
                                  .invoiceCustomer{float:left;width:40%;font-size: 11px;}
                                  .invoiceLogo{float:left;width:20%;font-size: 11px;}
                                  .invoiceLogo img{width: 91px;font-size: 11px;}
                                  .invoiceDetails{float:left;width:39%;font-size: 11px;}
                                  .customerTitle{	font-weight:bold;color:black;	font-size: 14px;text-transform:capitalize;}
                                  #companyInfoTbl{width:100%;font-size: 11px;}
                                  .lbl{font-weight:bold;color:black;font-size: 11px;text-transform:none !important;}
                                  .lbl2{font-weight:bold;color:white;font-size: 11px;text-transform:none !important;}
                                  #eInvoiceTitle{color: black !important;text-transform: none !important;margin: 0px;font-size: 12px;}
                                  #invoiceDetailTbl td { padding:3px;font-size: 11px;border-top:1px solid black; }
                                  
                                  @media print {
                                  body {
                                  -webkit-print-color-adjust: exact;
                                  print-color-adjust: exact;
                                  }
                                  }
                                  
                                  
                                  
                                  #invoiceDetailTbl  { border-bottom:1px solid black; }
                                  .invoiceID{ font-weight:bold;font-size: 15px;}
                                  .invoiceDetailColor{color:black;font-weight:bold;font-size: 11px;}
                                  #ettn{ font-size: 11px;height: 30px;width: 800px;}
                                  #ettn p{margin:0px;padding-top: 9px;padding-left: 6px;font-size: 11px;}
                                  #invoiceLines{margin-top:10px;font-size: 11px;}
                                  #lineTable{border-bottom:1px solid gray;font-size: 13px;text-align: left;border-collapse:collapse;
                                  color:#414141;}
                                  #lineTable th{color:white;height: 30px;text-align:center;padding: 3px;border: none;font-size: 11px;font-weight: bold;}
                                  #lineTable td{padding: 1px; font-size: 10px;}
                                  #lineTable tr{padding: 0px;border: none;height: 25px;font-size: 11px;}
                                  .coloredTr{	background-color: #f6f6f6 !important;font-size: 11px;}
                                  #invoiceTotal{width: 800px;font-size: 11px;}
                                  #budgetContainerTable{width:260px;margin-top:5px;float:right;font-size: 13px;border-bottom: 1px solid black;border-top: 1px solid black;text-align: left;border-collapse: collapse;color:#414141;}
                                  #budgetContainerTable tr{padding: 0px;border: none;background-color: transparent;font-size: 11px;}
                                  #budgetContainerTable td{border-top: 1px solid black;font-size: 11px;text-align:right;height: 17px;}
                                  #budgetContainerTable th{border-top: 1px solid black;font-size: 11px;text-align:right;height: 17px;}
                                  .notesMainTr{border-spacing: 0px;height: 80px;font-size: 11px;position: static;bottom: 100px;}
                                  #notes{width:500px;font-size: 11px;}
                                  #notesTable{width: 100%;font-size: 11px;}
                                  .BankaTr{border-spacing: 0px;height: 80px;font-size: 11px;position: static;bottom: 20px;}
                                  #banka{width:800px;font-size: 11px;text-align:center;}
                                  #banka th{background-color: #E38F15;color:white;height: 15px;text-align:center;padding: 3px;border: none;font-size: 11px;font-weight: bold;}
                                  .noteLbl{width: 16%;font-weight: bold;color: black;font-size: 11px;}
                                  .pageInfo{height: 20px;position: static;bottom: 0px;font-size: 11px;}
                                </style>
                                <title>Atasun Optik | e-Arşiv Fatura</title>
                              </head>
                              <body>
                                
                                <xsl:for-each select="$XML">
                                  <img style="z-index:-1;position: absolute;padding-top:420px;padding-left:115px" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBmRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAAQAAAATgAAAAAAAABgAAAAAQAAAGAAAAABcGFpbnQubmV0IDUuMC42AP/iAdhJQ0NfUFJPRklMRQABAQAAAcgAAAAABDAAAG1udHJSR0IgWFlaIAfgAAEAAQAAAAAAAGFjc3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAD21gABAAAAANMtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACWRlc2MAAADwAAAAJHJYWVoAAAEUAAAAFGdYWVoAAAEoAAAAFGJYWVoAAAE8AAAAFHd0cHQAAAFQAAAAFHJUUkMAAAFkAAAAKGdUUkMAAAFkAAAAKGJUUkMAAAFkAAAAKGNwcnQAAAGMAAAAPG1sdWMAAAAAAAAAAQAAAAxlblVTAAAACAAAABwAcwBSAEcAQlhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z1hZWiAAAAAAAAD21gABAAAAANMtcGFyYQAAAAAABAAAAAJmZgAA8qcAAA1ZAAAT0AAAClsAAAAAAAAAAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAgEBAQEBAgEBAQICAgICBAMCAgICBQQEAwQGBQYGBgUGBgYHCQgGBwkHBgYICwgJCgoKCgoGCAsMCwoMCQoKCv/bAEMBAgICAgICBQMDBQoHBgcKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCv/AABEIAVMCWAMBEgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP38ooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigArnfF/iaazf8AszT5Nr7f3sg6r7CgDZu9Y0ywOLu9jQ/3d3P5V54zM7bnbJ7k0Ad3H4r0CVtq6io/3lI/pXCUAekwXEFynmW8yuv95WzXn2nape6XOJ7SYr/eXs31oA9Eqro2qw6xYreRDB6Ov91vSgC1RQAUUAIzqil3OAvJPpWV40vWtNFZEOGmYJ+HegDH17xldXUrW+mSGOEceYPvN/hWDQA6SeeV/MlmZm/vM2abQBZtNX1OxYNbX0i7f4d2R+VVqAOy8NeLE1VvsV4oSfHykdH/APr1x8M0tvMs8LbWVsq3pQB6VUNhdLe2UV2v/LSMNQBNRQAUUAFZPijxENGgENvg3En3f9ketAF6+1TT9NXde3Sx+gPU/hXn09xPcytNcSs7NyWY0AdmvjXw+zbftLf73lmuJoA9GstRsdQTzLK5WQf7J6V57a3dzZTrcWsrIy91oA9Iqj4e1pNasBORtkX5ZF9D60AXqKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigApGdUUu5wF5J9KAFLBRuY4FcV4l8TXGqzNbWzstupwFH8fuaAOnn8TaFbttfUYyf9nn+VcDQB31t4k0S6fy4tQj3HoG4z+dcDQB6ZmuP8L+KZrGZbG+lLQMcKzH7n/1qAOwozQAUUABOBmg88UAec6lM9xqE0z9WkY/rTtVt2tdSngb+GRv50AV6KACigAooA6H4f3LrezWhPytHux7g/wD16T4f2zNezXePlSPb+JP/ANagDrKKACigDB+ICMdMhkBOFm5/KtTWtOGq6bJZ5+Zl+U+h7UAee06eGW3maCZCrK2GU9qAG0UAFFABV/w9o0us36xY/drzK3oPT8aAOx0CJoNFto26+SDVxQFG1RwOBQAUUAFFAHA+JLx73WriRj919i+wHFN8QWz2us3ETjrIWH0PNAFOigAooAKKAN3wFctHqslt/DJF+opPAVs0mrNcY+WOI/rQB2FFABRQAVDf3sGnWj3lwflRc/X2oAkmnhtozLcSqijqzNgVwOsa3eazcGW4chAf3cY6LQB17+K9AQ7TqCn/AHVJrhKAPQrPXNKv22Wt9Gzf3c4NefKzIwdGwR0I7UAel1z/AIR8TSXrf2bqEm6TH7uQ/wAXsfegDoKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACkZlRS7tgDqT2oAWsu58YaFbPs+1+Yf8ApmuRQBqVm2ni3Q7tti3exj08xduaANKgEMMqaACigAooAy/F909roUpjOC+E/OjxjbtcaFIVH+rIagDh6KACigAooAKKAO88LXUl3ocMkhyyjbn1xTvDds1polvE4+by9x/HmgC9RQAUUAc5408Py3B/tWyj3MFxMqjk+9dHQB5nXeah4Y0bUWMk1rtdurx/KaAODrso/AmiI25jM3+y0nX8hQByVlZXOoXC21rEWZvTt716DZadZadH5dlbLGP9kdaAIdD0mPRrBbVOW6yN6tVqSRIkMkjhVXlmbtQA6sO+8d6ZbsUtY3mI7jhaANyuaX4hru+fTTt9pKAOlrO0rxRpWrP5UUhjk/55ycZ+nrQAus+G9P1ob5lKSdpE6/j61oUAcnL8Pr4P+5vomX/aBBrrKAOZsvh8Q+7UL4bf7sQ6/ia6agCGxsLTToBb2cIRfbvUrMqKXdgqjkk9qAFrFv8AxxpVqxjtw0zDuv3f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"/>
                                  
                                  <table id="container" style="height:1200px;">
                                    <tr class="containerTr">
                                      <td>
                                        <table id="invoiceTop">
                                          
                                          <tr>
                                            <td style="width:270px">
                                              <table style="width:270px" cellpadding="0" cellspacing="0">
                                                <tr>
                                                  <td align="center" >
                                                    <img style="width:250px" src="data:image/jpeg;base64,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fK/Tx76uIPfOEfdh5uvbSz6Lc4bwl1M2KSbMbdG+qPai+5pbZdCk+jj23OF28eeXtuOXXq4UOzFl0d60mt7ky9Nz7PHP3yb5+dOXtsRrMy3PwtQa2daHzhaE37y18vZTl1Jd+fJfgX8bC/PLya8nJ23x18QDDu+Z1BpYfHN13k/R0cuhn5PNEXp4h1aK3Htfmn4N+CHTb6Z+3Ry+sWmVjfGvKuZpyjW4nijulUaT6OHfc8M6jO5+uz249r8kHTm083ZQj3ctoYa8HVilUdHLF+W0bhaAD59ET1ZRumU1JQfl5K0S4Ulnm2nnsBd+YrD6WfXvmXUVhI4XkrQFz75qPU7NyePbc5Ge/wDJXg/bfrzUmp7Uim0nvkK6eaDc5uS6lYKxAA5z6jG4Xm/5nWF9t+iTv0NzCk5+Dfg5ez78t/d4h+7Pt5m0loJtJ57B+XkrRLf1SeOddZ95dSkomimnYKxn4rqVsDe1MN5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAn4KGTm663Tz66OUPfAAAAAAAAAAP//aAAwDAQACAAMAAAAh8888888888888888846GdQ958+8888888888888888888888888888888888P+xrlkqW0ysV888888888888888888888888888888qbPQ9julmomSoV18888888888888888888888888888Xm5ZqKW88MQxw+3JA8888888888888888888888888881o50Txk088MnfUVX+888888888888888888888888888u84g364c88MfYmd5M888888888888888888888888888vfago9mA0EMXn3gf888888888888888888888888888886HcE8Ak8kQ0I5fX8888888888888888888888888888888Kr6FpYIJZaIe888888888888888888888888888888888vMc2a1o/O888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888842c8ne8888888888888888884bxFG388880089Ub8888fYv888079y/13/8988/57488/8A/PPdcvON/wBbUv8Ar80875+u38++sNq3P/8Aq1/A/ObpNPP5vPKLXn++P1vvP670fL//AP7fz3yM9NblYitfwPyrz9Tzh/zznb/y379Xzz+4jzzX3zj7/jQzvx7D17pPDPyrz9Tzrfr9PX/bOH9nzz+shzz5zzx61u2/ix17j69mD23zxzzzy5O97z/T5y1tx/8AM8+P88888888888888888888888888888881088888888888/9oADAMBAAIAAwAAABDzzzzzzzzzzzzzzzzz7n7djxr7rzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzwDa6Fdiwvqmfzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzy36pe+s6RfXT1BKnzzzzzzzzzzzzzzzzzzzzzzzzzzzwnvNqnlwgzzCM5q8znzzzzzzzzzzzzzzzzzzzzzzzzzzzWTjX94jzzx/Xr8aXbzzzzzzzzzzzzzzzzzzzzzzzzzzwwuJIUbVzzwNEyDJh/wA88888888888888888888888888l9XDrw8P0k8fWJQ2h88888888888888888888888888889leloTwEocMTr7Q8888888888888888888888888888888p87KIhB7ubNU8888888888888888888888888888888888P/AH0NL/ffPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPiPvNlfPPPPPPPPPPPPPPPPPOGd5ktPPPPLX/L/TPPPPP46/F0N+MNPtf/AD/3z77f/jzy7/zxtTzff33P63T7zT7mmyb1eZxy6z6Uy6tfyq2y8/zzv/zzu9+Wjr23zz76VAzWP7nddbxCZHzPfitfyr3/AM+88rJ88sv8X959988+o7282W84tVS271k8/kks51O9/wDPvPOLue1NfFJePsPvPvjj8DvPPTrEHfMpHKfr/mpjvrPP3PPPetf/ADxXN35Aw50/zz/zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzlbzzzzzzzzzzz/xAA8EQABAwIEAgYHBwMFAQAAAAABAAIDBBEFEiExE0EQ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"/>
                                                    
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td style="height:6px">
                                                    
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="customerTitle">
                                                    <b>Merkez</b>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td style="height:7px;background-color:#5b5a5f"> </td>
                                                </tr> <tr>
                                                  <td style="height:6px">
                                                    
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="customerTitle">
                                                    <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name" />
                                                    <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person"> 
                                                      <br/>
                                                      <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/Title">
                                                        <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/cbc:Title" />
                                                        <xsl:text> </xsl:text>
                                                      </xsl:if>
                                                      <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/cbc:FirstName" />
                                                      <xsl:text> </xsl:text>
                                                      <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/MiddleName">
                                                        <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/cbc:MiddleName" />
                                                        <xsl:text> </xsl:text>
                                                      </xsl:if>
                                                      <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/cbc:FamilyName" />
                                                      <xsl:text> </xsl:text>
                                                      <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/NameSuffix">
                                                        <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/cbc:NameSuffix" />
                                                      </xsl:if> 
                                                    </xsl:if>
                                                  </td> 
                                                </tr>
                                                
                                                <tr>
                                                  
                                                  <td class="capital">
                                                    
                                                    <span class="lbl">Adres: </span>
                                                    <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:StreetName">
                                                      <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:StreetName"/>
                                                      <xsl:text>&#160;</xsl:text>
                                                    </xsl:if>
                                                    <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:BuildingName">
                                                      <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:BuildingName"/>
                                                      <xsl:text>&#160;</xsl:text>
                                                    </xsl:if>
                                                    <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:BuildingNumber">
                                                      <xsl:text> No:</xsl:text>
                                                      <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:BuildingNumber"/>
                                                      <xsl:text>&#160;</xsl:text>
                                                    </xsl:if>
                                                    <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:PostalZone">
                                                      <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:PostalZone"/>
                                                      <xsl:text>&#160;</xsl:text>
                                                    </xsl:if>
                                                    <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:CitySubdivisionName"/>
                                                    <xsl:text>/</xsl:text>
                                                    <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:CityName"/>
                                                    
                                                  </td>
                                                </tr>
                                                <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:Telephone">
                                                  <tr>
                                                    <td>
                                                      <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:Telephone!=''">
                                                        <span class="lbl">Tel: </span>
                                                        <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:Telephone"/>
                                                      </xsl:if>
                                                      <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:Telefax!=''">
                                                        <xsl:text>&#160;</xsl:text>
                                                        <span class="lbl">Fax: </span>
                                                        <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:Telefax"/>
                                                      </xsl:if>
                                                    </td>
                                                  </tr>
                                                </xsl:if>
                                                <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:ElectronicMail!=''">
                                                  <tr>
                                                    <td class="lower">
                                                      <span class="lbl">E-mail: </span>
                                                      <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:ElectronicMail"/>
                                                    </td>
                                                  </tr>
                                                </xsl:if>
                                                <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cbc:WebsiteURI!=''">
                                                  <tr>
                                                    <td class="lower">
                                                      <span class="lbl">Web: </span>
                                                      <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cbc:WebsiteURI"/>
                                                    </td>
                                                  </tr>
                                                </xsl:if>
                                                <xsl:if test="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cac:TaxScheme/cbc:Name">
                                                  <tr>
                                                    <td class="capital">
                                                      <span class="lbl">Vergi Dairesi: </span>
                                                      <xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cac:TaxScheme/cbc:Name"/>
                                                    </td>
                                                  </tr>
                                                </xsl:if>
                                                <xsl:for-each select="//n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification">
                                                  <tr>
                                                    <td>
                                                      <span class="lbl">
                                                        <xsl:value-of select="cbc:ID/@schemeID"/>:
                                                      </span>
                                                      <xsl:value-of select="cbc:ID"/>
                                                    </td>
                                                  </tr>
                                                </xsl:for-each>
                                                
                                              </table>
                                            </td>
                                            <td align="center"  rowspan="2"  style="width:200px">
                                              <img align="middle" alt="E-Fatura Logo"
                                                   src="data:image/jpeg;base64,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"/>
                                              <h2 id="eInvoiceTitle" align="center">e-Arşiv Fatura</h2>
                                              <br/><img style="width:150px;" src="data:image/jpeg;base64,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aUNc/X+kHu4/oFz1A3NfU9lDrjT1dzsfHFE4RticXRuubgfuPSNfb+p7K/hfG+Uc/wB/peVuYKR1Daofus+PDY6G+z5T77+NLpK32+ktdJHQ0NPHBBEOlkcbQ1rR8AK6jUo6I8UHx1+stmo+Ue78+nQhxhK8fFPaHRd/Nny49jdjxa2xWmwWunoaWJoaI4YwwHQ1s68n9V6aIqWU5Tk5SeWyakksIIiLUyEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBWZpS09DTo/PwrjngbG+61bn+eZNU1tThHFlBDcMh+n/fVkzwKS3b8fVcNnr13DQO69aNGdxPghheb5LzZpOoqfMr5d5ftXHNEyipP/MMiuLvoW+giPVI6V3Zri34B0SsV4/4Nr7xeaTkPme6SX7Koy2WGIPMdNSa8NEbdNOt+4WWcUcQUWCUP9o3iVl2ye4ASXO5yDqdJKe56N/lb+n6LZkcMcQ+xoBPk/Kn+/QsoSoWHN7SqdZd1H7Me+OfU8PYus1Kq9l0IhibEwMa0DXsBoK4iKrJQREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBUNiiY5z2RMa5/5iGgE/uq0QEKURAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB//9k="/>
                                              
                                            </td>
                                            <td align="right"> 
                                              <div id="qrcode"/>
                                              <div id="qrvalue" style="visibility: hidden; height: 1px;width: 1px;"> {
                                                "vkntckn":"<xsl:value-of select="n1:Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID[@schemeID = 'TCKN' or @schemeID = 'VKN']"/>", 
                                                "avkntckn":"<xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID[@schemeID = 'TCKN' or @schemeID = 'VKN']"/>
                                                <xsl:text/>", 
                                                "senaryo":"<xsl:value-of select="n1:Invoice/cbc:ProfileID"/>", 
                                                "tip":"<xsl:value-of select="n1:Invoice/cbc:InvoiceTypeCode"/>", 
                                                "tarih":"<xsl:value-of select="n1:Invoice/cbc:IssueDate"/>", "no":"<xsl:value-of select="n1:Invoice/cbc:ID"/>", 
                                                "ettn":"<xsl:value-of select="n1:Invoice/cbc:UUID"/>", "parabirimi":"<xsl:value-of select="n1:Invoice/cbc:DocumentCurrencyCode"/>", 
                                                "malhizmettoplam":"<xsl:value-of select="n1:Invoice/cac:LegalMonetaryTotal/cbc:LineExtensionAmount"/>
                                                <xsl:for-each select="n1:Invoice/cac:TaxTotal/cac:TaxSubtotal[cac:TaxCategory/cac:TaxScheme/cbc:TaxTypeCode = '0015']">"<xsl:text>, 
										"kdvmatrah</xsl:text>(<xsl:value-of select="cbc:Percent"/>)":"<xsl:value-of select="cbc:TaxableAmount"/>
                                                </xsl:for-each>
                                                <xsl:for-each select="n1:Invoice/cac:TaxTotal/cac:TaxSubtotal[cac:TaxCategory/cac:TaxScheme/cbc:TaxTypeCode = '0015']">
                                                  <xsl:text>", 
											"hesaplanankdv</xsl:text>(<xsl:value-of select="cbc:Percent"/>)":"<xsl:value-of select="cbc:TaxAmount"/>
                                                </xsl:for-each>", 
                                                "vergidahil":"<xsl:value-of select="n1:Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount"/>", 
                                                "odenecek":"<xsl:value-of select="n1:Invoice/cac:LegalMonetaryTotal/cbc:PayableAmount"/>" }</div>
                                              <script type="text/javascript"> var qrcode = new QRCode(document.getElementById("qrcode"), 
                                                { width : 250, height : 250, correctLevel : QRCode.CorrectLevel.L }); function makeCode (msg) { var elText = document.getElementById("text"); qrcode.makeCode(msg); } makeCode(document.getElementById("qrvalue").innerHTML); </script>
                                              <br/>
                                              
                                            </td>
                                          </tr>
                                          
                                          <tr>
                                            <td style="width:270px">
                                              <table style="width:290px"  cellpadding="0" cellspacing="0">
                                                <tr>
                                                  <td style="height:7px;background-color:#d05c0a"> </td>
                                                </tr>
                                                <tr>
                                                  <td style="height:6px">
                                                    
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="customerTitle">
                                                    SAYIN
                                                  </td>
                                                </tr>
                                                <tr> 
                                                  <td class="customerTitle">
                                                    <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyName/cbc:Name" />
                                                    
                                                  </td> 
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <table id="customerInfoTbl"  cellpadding="0" cellspacing="0"> 
                                                      <tr>
                                                        
                                                        <td class="capital">
                                                          <span class="lbl">Adres: </span>
                                                          <xsl:if test="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:StreetName">
                                                            <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:StreetName"/>
                                                            <xsl:text>&#160;</xsl:text>
                                                          </xsl:if>
                                                          <xsl:if test="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:BuildingName">
                                                            <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:BuildingName"/>
                                                            <xsl:text>&#160;</xsl:text>
                                                          </xsl:if>
                                                          <xsl:if test="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:BuildingNumber">
                                                            <xsl:text> No:</xsl:text>
                                                            <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:BuildingNumber"/>
                                                            <xsl:text>&#160;</xsl:text>
                                                          </xsl:if>
                                                          <xsl:if test="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:PostalZone">
                                                            <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:PostalZone"/>
                                                            <xsl:text>&#160;</xsl:text>
                                                          </xsl:if>
                                                          <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:CitySubdivisionName"/>
                                                          <xsl:text>/</xsl:text>
                                                          <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:CityName"/>
                                                          
                                                        </td>
                                                      </tr>
                                                      <xsl:if test="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:Telephone">
                                                        <tr>
                                                          <td>
                                                            <xsl:if test="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:Telephone!=''">
                                                              <span class="lbl">Tel: </span>
                                                              <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:Telephone"/>
                                                            </xsl:if>
                                                            <xsl:if test="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:Telefax!=''">
                                                              <xsl:text>&#160;</xsl:text>
                                                              <span class="lbl">Fax: </span>
                                                              <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:Telefax"/>
                                                            </xsl:if>
                                                          </td>
                                                        </tr>
                                                      </xsl:if>
                                                      <xsl:if test="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:ElectronicMail!=''">
                                                        <tr>
                                                          <td class="lower">
                                                            <span class="lbl">E-mail: </span>
                                                            <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:ElectronicMail"/>
                                                          </td>
                                                        </tr>
                                                      </xsl:if>
                                                      <xsl:if test="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cbc:WebsiteURI!=''">
                                                        <tr>
                                                          <td class="lower">
                                                            <span class="lbl">Web: </span>
                                                            <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cbc:WebsiteURI"/>
                                                          </td>
                                                        </tr>
                                                      </xsl:if>
                                                      <xsl:if test="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyTaxScheme/cac:TaxScheme/cbc:Name">
                                                        <tr>
                                                          <td class="capital">
                                                            <span class="lbl">Vergi Dairesi: </span>
                                                            <xsl:value-of select="n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyTaxScheme/cac:TaxScheme/cbc:Name"/>
                                                          </td>
                                                        </tr>
                                                      </xsl:if>
                                                      <xsl:for-each select="//n1:Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification">
                                                        <tr>
                                                          <td>
                                                            <span class="lbl">
                                                              <xsl:value-of select="cbc:ID/@schemeID"/>:
                                                            </span>
                                                            <xsl:value-of select="cbc:ID"/>
                                                          </td>
                                                        </tr>
                                                      </xsl:for-each>
                                                      
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                              
                                            </td>
                                            
                                            <td align="right">
                                              
                                              <table style="width:250px;" id="invoiceDetailTbl" cellpadding="0" cellspacing="0">
                                                <tr>
                                                  <td class="invoiceDetailColor" align="right">Özelleştirme No</td>
                                                  <td class="doubleDot">:</td>
                                                  <td>
                                                    <xsl:value-of select="n1:Invoice/cbc:CustomizationID"/>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="invoiceDetailColor" align="right">Senaryo</td>
                                                  <td class="doubleDot">:</td>
                                                  <td class="capital">
                                                    <xsl:value-of select="n1:Invoice/cbc:ProfileID"/>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="invoiceDetailColor" align="right">Fatura Tipi</td>
                                                  <td class="doubleDot">:</td>
                                                  <td class="capital">
                                                    <xsl:value-of select="n1:Invoice/cbc:InvoiceTypeCode"/>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="invoiceDetailColor" align="right">
                                                    <span class="invoiceDetailColor" align="right">Fatura No: </span>
                                                    
                                                  </td>  <td class="doubleDot">:</td>
                                                  <td>
                                                    <xsl:value-of select="n1:Invoice/cbc:ID"/>
                                                  </td>
                                                </tr>
                                                
                                                
                                                
                                                <tr>
                                                  <td class="invoiceDetailColor" align="right">Fatura Tarihi</td>
                                                  <td class="doubleDot">:</td>
                                                  <td>
                                                    <xsl:for-each select="n1:Invoice/cbc:IssueDate">
                                                      <xsl:value-of select="substring(.,9,2)"/>.<xsl:value-of select="substring(.,6,2)"/>.<xsl:value-of select="substring(.,1,4)"/>
                                                    </xsl:for-each>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="invoiceDetailColor" align="right">Fatura Saati</td>
                                                  <td class="doubleDot">:</td>
                                                  <td>
                                                    <xsl:for-each select="n1:Invoice/cbc:IssueTime">
                                                      <xsl:value-of select="substring(//n1:Invoice/cbc:IssueTime,1,8)"/>
                                                    </xsl:for-each>
                                                  </td>
                                                </tr>
                                                <xsl:for-each select="n1:Invoice/cac:DespatchDocumentReference">
                                                  <tr>
                                                    <td class="invoiceDetailColor" align="right">İrsaliye No</td>
                                                    <td class="doubleDot">:</td>
                                                    <td>
                                                      <xsl:value-of select="cbc:ID"/>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td class="invoiceDetailColor" align="right">İrsaliye Tarihi</td>
                                                    <td class="doubleDot">:</td>
                                                    <td align="left">
                                                      <xsl:for-each select="cbc:IssueDate">
                                                        <xsl:value-of select="substring(.,9,2)"/>.<xsl:value-of select="substring(.,6,2)"/>.<xsl:value-of select="substring(.,1,4)"/>
                                                      </xsl:for-each>
                                                    </td>
                                                  </tr>
                                                </xsl:for-each>
                                                <!--<xsl:for-each select="n1:Invoice/cac:OrderReference">
                                                     <tr>
                                                     <td class="invoiceDetailColor" align="right">Sipariş No</td>
                                                     <td class="doubleDot">:</td>
                                                     <td>
                                                     <xsl:value-of select="cbc:ID"/>
                                                     </td>
                                                     </tr>
                                                     <tr>
                                                     <td class="invoiceDetailColor" align="right">Sipariş Tarihi</td>
                                                     <td class="doubleDot">:</td>
                                                     <td align="left">
                                                     <xsl:for-each select="cbc:IssueDate">
                                                     <xsl:value-of select="substring(.,9,2)"/>.<xsl:value-of select="substring(.,6,2)"/>.<xsl:value-of select="substring(.,1,4)"/>
                                                     </xsl:for-each>
                                                     </td>
                                                     </tr>
                                                     </xsl:for-each>-->
                                                
                                                <xsl:for-each select="n1:Invoice/cac:AdditionalDocumentReference">
                                                  <xsl:if test="./cbc:DocumentTypeCode[contains(.,'SYSTEM_CODE')]">
                                                    <tr>
                                                      <td class="invoiceDetailColor" align="right">Referans No</td>
                                                      <td class="doubleDot">:</td>
                                                      <td>
                                                        <xsl:value-of select="./cbc:ID"/>
                                                      </td>
                                                    </tr>
                                                  </xsl:if>
                                                </xsl:for-each>
                                              </table>
                                              
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr> 
                                    
                                    <tr class="invoiceLineMainTr">
                                      <td id="invoiceLines">
                                        <table id="lineTable" width="800">
                                          <tr style="
                                                background-repeat: no-repeat;background-position: center;
                                                background-size: 800px 40px ;
                                                background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAAjCAYAAABsDG5bAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANUSURBVHhe7d3Ni1V1HMfxz0zzfEcdRs2KBB1UMqUCqYUgBFK0CI0gqAxEqP+oTbva1Cpo3U5oVwvblDFqPqQMo5ljjuPcp9OZ8VBOiuXonMXc12tz7/l+zz/w5pzfvX3HPjxeBAAAoAb91ScAAMCaEyAAAEBtBAgAAFAbAQIAANRGgAAAALURIAAAQG0ECAAAUBsBAgAA1EaAAAAAtREgAABAbQQIAABQGwECAADURoAAAAC1ESAAAEBtBAgAAFAbAQIAANRGgADwxLTaneobADyYAAHg8RRF+op2Jlq/5cjI6WxtXShnZYiUcwD4NwECwOpU4TGUxWwoZvPJwHd5tfVDPh44ma3F5QykdTdEAOAeAgSAVXkq7WzKfKbK2Hh7/EZGyxBZMpgi7wxfyHPFzN2ZCAHgHgIEgEfWX7SzOXPZ353OW2Pnsmv++2pz17PNczkydjZ7uuczXkbK0pMSAFgiQAB4JP1FN5NlfOxrT+fgyOVsXLhSbVaaXLiYw41L2d0+l9HccSYEgGUCBID/Z/nMRycbcjO7FqfzWuNaRpo3quWDjS/M5PDE9Uw1z1avY4kQgF4nQAD4b2U49KeTjWV87Lj9U94c/iXDi9er5cON3bqUd4dOZfvC6TSyIEIAepwAAeDhymAYTDNbMpuX2j/n6Nh0tXg074/+mBc6ZzJZRowIAehdAgSABysjoa/oZqiMj6dzNa90z+bg6Gy1XJ03Ghezp/trJnJLhAD0KAECwP3KOOhPsXx4/JnM5EDO5MDATIZbc9UNqzN05/e8PnI+e3M+Y0uvYwHQcwQIACtV8TGcZjZ3r+blXMq+gWsZ7N6ubng8Q825HGpcye7+2aTTrKYA9AoBAsB9BtLJWOfP7Oq/kRcb8xlsz1ebJ2NkfiZHuyczNbKQdrtVTQHoBQIEgBX6UqSvs5jto+0cyqkMl7GwVj5qfpO944tlhPijQoBeIUAA+EdRpNvt5PlNQznS/LYarq0PFr7OzsnBtNqdagLAeiZAAPhbpwyQHRODOXbrq2pSjxNzn2dqSyOdbreaALBeCRAAlhVlfOyf6OT4zS+qSb1O/PFZprZt8uu8AOucAAFg2dSW0bw392V1VYul1FiRG8dnP83ObRurKwDWn+QvcJ7ytaR8n5wAAAAASUVORK5CYII=)">
                                            <td colspan="12" >
                                              
                                              <span class="lbl2" style="padding-left:5px">ETTN: 
                                                <xsl:value-of select="n1:Invoice/cbc:UUID"/></span>
                                            </td>
                                          </tr>
                                          <tr style="
                                                background-repeat: no-repeat;background-position: center;
                                                background-size: 800px 36px ;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAAoCAMAAAAxFW6qAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC0UExURdtZAOBwJOWJS/z38/z079taAu2vhv7+/v////79/eyrf91jEPXVv/TNs+F1LPru5vnn2+F2LeeSWP77+f339NtbBO+5lO+1jt1mFfbcyt5nF+J7Nfvz7Pvs4+J8N+mbZ/78/P76+OmcZ9tdB/HCo/G+nNxeCN5rHPjj1Pfcyt9sHuSCQPz28vzx6uSDQuqkdf79/OukdNtZAdxgC/PMsPLHqdxgDPnp3eBxJf359vz18OWLTYLQeaYAAAAJcEhZcwAADsIAAA7CARUoSoAAAADiSURBVHhe7dPHUgJREIZRwDSIWTHniDnn938v01+UlIg7N/ec1Z3unuVXAwAAAAAAAAAAAAAAAAAAAAAAKFq9ngfwQ2NouJEn0GtkdKyqmuMj+QS+aU1UnyZbGQBdU9NffVTVzGxGQMzNJ493C3MZAh/ai2kjltpZALXllYTRNbGaFRRvbT1ZfLOxmSUUbms7UfTY2c0aSra3nyJ+ODjMCRTrqJMc+jg+yREU6vQsMfR1fpEzKNJlMyn84ur6JpdQnNu7dDDA/UOOoTD1x0QwUOcp51CUxnMS+MPLa37g39Rqb+mBEQ2DkhY8AAAAAElFTkSuQmCC)">
                                            <th style="width:15px;" align="center">Sıra No</th>
                                            <th style="width:240px;" align="center">Mal Hizmet</th>
                                            <th style="width:90px;" align="center">Miktar</th> 
                                            <th style="width:50px;" align="center">Birim Fiyat</th>
                                            <th style="width:70px;" align="center">İskonto Tutarı</th>
                                            <th style="width:50px;" align="center">KDV Oranı</th>
                                            <th style="width:58px;" align="center">KDV Tutarı</th>
                                            <th style="width:70px;" align="center">Mal Hizmet Tutarı</th>
                                          </tr>
                                          <xsl:for-each select="n1:Invoice/cac:InvoiceLine">
                                            <tr>
                                              <td align="center">
                                                <xsl:value-of select="./cbc:ID"/>
                                              </td>
                                              
                                              
                                              <td align="center">
                                                <xsl:value-of select="./cac:Item/cbc:Name"/>
                                              </td>
                                              <td align="center">
                                                <xsl:value-of select="format-number(./cbc:InvoicedQuantity, '###.###,00', 'european')"/>
                                                
                                                <xsl:if test="./cbc:InvoicedQuantity/@unitCode">
                                                  <xsl:for-each select="./cbc:InvoicedQuantity">
                                                    <xsl:text/>
                                                    <xsl:choose>
                                                      <xsl:when test="@unitCode  = '26'">
                                                        <xsl:text>Ton</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'BX'">
                                                        <xsl:text>Kutu</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'C62'">
                                                        <xsl:text>Adet</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'EA'">
                                                        <xsl:text>Adet</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'KGM'">
                                                        <xsl:text>KG</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'KJO'">
                                                        <xsl:text>kJ</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'GRM'">
                                                        <xsl:text>G</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'MGM'">
                                                        <xsl:text>MG</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'NT'">
                                                        <xsl:text>Net Ton</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'GT'">
                                                        <xsl:text>GT</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'MTR'">
                                                        <xsl:text>M</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'MMT'">
                                                        <xsl:text>MM</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'KTM'">
                                                        <xsl:text>KM</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'MLT'">
                                                        <xsl:text>ML</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'MIL'">
                                                        <xsl:text>MIL</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'MMQ'">
                                                        <xsl:text>MM3</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'CLT'">
                                                        <xsl:text>CL</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'CMK'">
                                                        <xsl:text>CM2</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'CMQ'">
                                                        <xsl:text>CM3</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'CMT'">
                                                        <xsl:text>CM</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'MTK'">
                                                        <xsl:text>M2</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'MTQ'">
                                                        <xsl:text>M3</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'DAY'">
                                                        <xsl:text>Gün</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'MON'">
                                                        <xsl:text>Ay</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'PA'">
                                                        <xsl:text>Paket</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'KWH'">
                                                        <xsl:text>KWH</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'CT'">
                                                        <xsl:text>Karton</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'TNE'">
                                                        <xsl:text>Ton</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'CS'">
                                                        <xsl:text>CS</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'BO'">
                                                        <xsl:text>Şişe</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'PK'">
                                                        <xsl:text>Paket</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = '15'">
                                                        <xsl:text>Paket</xsl:text>
                                                      </xsl:when>
                                                      <xsl:when test="@unitCode  = 'PK'">
                                                        <xsl:text>Stick</xsl:text>
                                                      </xsl:when>
                                                    </xsl:choose>
                                                  </xsl:for-each>
                                                </xsl:if>
                                              </td>
                                              <td align="center">
                                                <xsl:value-of select="format-number(./cac:Price/cbc:PriceAmount, '###.##0,00', 'european')"/>
                                                <xsl:if test="./cac:Price/cbc:PriceAmount/@currencyID">
                                                  <xsl:if test='./cac:Price/cbc:PriceAmount/@currencyID = "TRY" '>
                                                    <xsl:text>&#160;TL</xsl:text>
                                                  </xsl:if>
                                                  <xsl:if test='./cac:Price/cbc:PriceAmount/@currencyID != "TRY"'>
                                                    <xsl:value-of select="./cac:Price/cbc:PriceAmount/@currencyID"/>
                                                  </xsl:if>
                                                </xsl:if>
                                              </td>
                                              <td align="center">
                                                <xsl:if test="./cac:AllowanceCharge/cbc:Amount">
                                                  <xsl:value-of select="format-number(./cac:AllowanceCharge/cbc:Amount, '###.##0,00', 'european')"/>
                                                </xsl:if>
                                              </td>
                                              <td align="center">
                                                <xsl:for-each select="./cac:TaxTotal">
                                                  <xsl:for-each select="cac:TaxSubtotal/cac:TaxCategory/cac:TaxScheme">
                                                    <xsl:if test="cbc:TaxTypeCode='0015' ">
                                                      <xsl:if test="../../cbc:Percent">
                                                        <xsl:value-of select="concat('% ', format-number(../../cbc:Percent, '###.##0,00', 'european'))"/>
                                                      </xsl:if>
                                                    </xsl:if>
                                                  </xsl:for-each>
                                                </xsl:for-each>
                                              </td>
                                              <td align="center">
                                                <xsl:for-each select="./cac:TaxTotal">
                                                  <xsl:for-each select="cac:TaxSubtotal/cac:TaxCategory/cac:TaxScheme">
                                                    <xsl:if test="cbc:TaxTypeCode='0015' ">
                                                      <xsl:value-of select="format-number(../../cbc:TaxAmount, '###.##0,00', 'european')"/>
                                                      <xsl:if test="../../cbc:TaxAmount/@currencyID">
                                                        <xsl:if test="../../cbc:TaxAmount/@currencyID = 'TRY'">
                                                          <xsl:text>&#160;TL</xsl:text>
                                                        </xsl:if>
                                                        <xsl:if test="../../cbc:TaxAmount/@currencyID != 'TRY'">
                                                          <xsl:value-of select="../../cbc:TaxAmount/@currencyID"/>
                                                        </xsl:if>
                                                      </xsl:if>
                                                    </xsl:if>
                                                  </xsl:for-each>
                                                </xsl:for-each>
                                              </td>
                                              <td align="center">
                                                <xsl:value-of select="format-number(./cbc:LineExtensionAmount, '###.##0,00', 'european')"/>
                                                <xsl:if test="./cbc:LineExtensionAmount/@currencyID">
                                                  <xsl:if test="./cbc:LineExtensionAmount/@currencyID = 'TRY' ">
                                                    <xsl:text>&#160;TL</xsl:text>
                                                  </xsl:if>
                                                  <xsl:if test="./cbc:LineExtensionAmount/@currencyID != 'TRY' ">
                                                    <xsl:value-of select="./cbc:LineExtensionAmount/@currencyID"/>
                                                  </xsl:if>
                                                </xsl:if>
                                              </td>
                                            </tr> 
                                          </xsl:for-each>
                                        </table>
                                      </td>
                                    </tr> 
                                    
                                    <tr class="notesMainTr">
                                      <td id="notes">
                                        <table style="width:800px">
                                          <tr>
                                            <td style="vertical-align:bottom">
                                              
                                              <table id="notesTable">
                                                <tr>
                                                  <td class="noteLbl">
                                                    Genel Açıklamalar
                                                  </td>
                                                </tr>
                                                <xsl:for-each select="//n1:Invoice/cbc:Note">
                                                  <tr>
                                                    <td class="noteLbl">
                                                      
                                                      <xsl:value-of select="."/>
                                                    </td>
                                                  </tr>
                                                </xsl:for-each>
                                                <xsl:if test="//n1:Invoice/cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:TaxExemptionReason!=''">
                                                  <tr>
                                                    <td class="noteLbl">Kdv Muafiyet Nedeni:
                                                      <xsl:value-of select="//n1:Invoice/cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:TaxExemptionReason"/>
                                                    </td>
                                                  </tr>
                                                </xsl:if>
                                                <xsl:if test="//n1:Invoice/cac:PaymentMeans/cac:PayeeFinancialAccount/cbc:PaymentNote">
                                                  <tr>
                                                    <td class="noteLbl">Ödeme Açıklaması:
                                                      <xsl:value-of select="//n1:Invoice/cac:PaymentMeans/cac:PayeeFinancialAccount/cbc:PaymentNote"/>
                                                      <xsl:text>IBAN:&#160;</xsl:text>
                                                      <xsl:value-of select="//n1:Invoice/cac:PaymentMeans/cac:PayeeFinancialAccount/cbc:ID"/>
                                                    </td>
                                                  </tr>
                                                </xsl:if>
                                                <xsl:if test="//n1:Invoice/cac:PaymentTerms/cbc:Note">
                                                  <tr>
                                                    <td class="noteLbl">Ödeme Koşulu:
                                                      <xsl:value-of select="//n1:Invoice/cac:PaymentTerms/cbc:Note"/>
                                                    </td>
                                                  </tr>
                                                </xsl:if>
                                                <xsl:if test="//n1:Invoice/cac:PaymentMeans">
                                                  <tr>
                                                    <td class="noteLbl">Ödeme Şekli:
                                                      <xsl:for-each select="//n1:Invoice/cac:PaymentMeans">
                                                        <xsl:choose>
                                                          <xsl:when test="./cbc:PaymentMeansCode[.=48]">
                                                            <span>
                                                              Faturanın&#160;<xsl:value-of select="./cbc:InstructionNote"/>&#160;TL'si kredi kartı kullanılarak tahsil edilmiştir.
                                                            </span>
                                                          </xsl:when>
                                                        </xsl:choose>
                                                        <xsl:choose>
                                                          <xsl:when test="./cbc:PaymentMeansCode[.=30]">
                                                            <span>
                                                              Faturanın&#160;<xsl:value-of select="./cbc:InstructionNote"/>&#160;TL'sinin&#160;vadesi&#160;
                                                            </span>
                                                            <xsl:value-of select="substring(./cbc:PaymentDueDate,9,2)"/>.<xsl:value-of select="substring(./cbc:PaymentDueDate,6,2)"/>.<xsl:value-of select="substring(./cbc:PaymentDueDate,1,4)"/>
                                                            <span>&#160;tarihine kadardır.</span>
                                                          </xsl:when>
                                                        </xsl:choose>
                                                        <xsl:choose>
                                                          <xsl:when test="./cbc:PaymentMeansCode[.=10]">
                                                            <span>
                                                              Faturanın&#160;<xsl:value-of select="./cbc:InstructionNote"/>&#160;TL'si&#160;
                                                            </span>
                                                            <xsl:value-of select="substring(./cbc:PaymentDueDate,9,2)"/>.<xsl:value-of select="substring(./cbc:PaymentDueDate,6,2)"/>.<xsl:value-of select="substring(./cbc:PaymentDueDate,1,4)"/>
                                                            <span>&#160;tarihinde&#160;peşin&#160;olarak&#160;ödenecektir.</span>
                                                          </xsl:when>
                                                        </xsl:choose>
                                                        <br/>
                                                      </xsl:for-each>
                                                    </td>
                                                  </tr>
                                                </xsl:if>
                                                
                                              </table>
                                            </td>
                                            <td>
                                              
                                              <table align="right" id="budgetContainerTable">
                                                <tr>
                                                  <th>Mal Hizmet Toplam Tutarı</th>
                                                  <td style="width:80px">
                                                    <xsl:value-of select="format-number(n1:Invoice/cac:LegalMonetaryTotal/cbc:LineExtensionAmount, '###.##0,00', 'european')"/>
                                                    <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:LineExtensionAmount/@currencyID">
                                                      <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:LineExtensionAmount/@currencyID = 'TRY'">
                                                        <xsl:text>&#160;TL</xsl:text>
                                                      </xsl:if>
                                                      <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:LineExtensionAmount/@currencyID != 'TRY'">
                                                        <xsl:value-of select="n1:Invoice/cac:LegalMonetaryTotal/cbc:LineExtensionAmount/@currencyID"/>
                                                      </xsl:if>
                                                    </xsl:if>
                                                  </td>
                                                </tr>
                                                <xsl:if test="$legalMonetary">
                                                  <tr>
                                                    <th>Toplam İskonto</th>
                                                    <td>
                                                      <xsl:value-of select="format-number(($legalMonetary), '###.##0,00', 'european')"/>
                                                      <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount/@currencyID">
                                                        <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount/@currencyID = 'TRY'">
                                                          <xsl:text>&#160;TL</xsl:text>
                                                        </xsl:if>
                                                        <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount/@currencyID != 'TRY'">
                                                          <xsl:value-of select="n1:Invoice/cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount/@currencyID"/>
                                                        </xsl:if>
                                                      </xsl:if>
                                                    </td>
                                                  </tr>
                                                </xsl:if>
                                                <xsl:for-each select="//n1:Invoice/*/cac:TaxSubtotal">
                                                  <xsl:sort select="cbc:Percent" data-type="number"/>
                                                  <tr>
                                                    <th>
                                                      Vergi Matrahı %<xsl:value-of select="cbc:Percent" />&#160;
                                                    </th>
                                                    <td>
                                                      <xsl:value-of select="format-number(cbc:TaxableAmount, '###.##0,00', 'european')" />
                                                      <xsl:if test="cbc:TaxableAmount/@currencyID">
                                                        <xsl:if test="cbc:TaxableAmount/@currencyID = 'TRY'">
                                                          <xsl:text>&#160;TL</xsl:text>
                                                        </xsl:if>
                                                        <xsl:if test="cbc:TaxableAmount/@currencyID != 'TRY'">
                                                          <xsl:value-of select="cbc:TaxableAmount/@currencyID"/>
                                                        </xsl:if>
                                                      </xsl:if>
                                                    </td>
                                                  </tr>
                                                </xsl:for-each>					  
                                                <xsl:for-each select="//n1:Invoice/*/cac:TaxSubtotal">
                                                  <xsl:sort select="cbc:Percent" data-type="number"/>
                                                  <tr>
                                                    <th>
                                                      Hesaplanan %<xsl:value-of select="cbc:Percent" />&#160;
                                                    </th>
                                                    <td>
                                                      <xsl:value-of select="format-number(cbc:TaxAmount, '###.##0,00', 'european')" />
                                                      <xsl:if test="cbc:TaxableAmount/@currencyID">
                                                        <xsl:if test="cbc:TaxableAmount/@currencyID = 'TRY'">
                                                          <xsl:text>&#160;TL</xsl:text>
                                                        </xsl:if>
                                                        <xsl:if test="cbc:TaxableAmount/@currencyID != 'TRY'">
                                                          <xsl:value-of select="cbc:TaxableAmount/@currencyID"/>
                                                        </xsl:if>
                                                      </xsl:if>
                                                    </td>
                                                  </tr>
                                                </xsl:for-each>
                                                <tr>
                                                  <th>
                                                    <xsl:choose>
                                                      <xsl:when test="count(//n1:Invoice/cac:WithholdingTaxTotal/cac:TaxSubtotal)>0">
                                                        <xsl:text>Tevkifat </xsl:text>
                                                      </xsl:when>
                                                      <xsl:otherwise>
                                                        <xsl:text>Vergiler </xsl:text>
                                                      </xsl:otherwise>
                                                    </xsl:choose>
                                                    <xsl:text>Dahil Toplam Tutar</xsl:text>
                                                  </th>
                                                  <td>
                                                    <xsl:value-of select="format-number(n1:Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount, '###.##0,00', 'european')"/>
                                                    <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount/@currencyID">
                                                      <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount/@currencyID = 'TRY'">
                                                        <xsl:text>&#160;TL</xsl:text>
                                                      </xsl:if>
                                                      <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount/@currencyID != 'TRY'">
                                                        <xsl:value-of select="n1:Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount/@currencyID"/>
                                                      </xsl:if>
                                                    </xsl:if>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>Ödenecek Tutar</th>
                                                  <td>
                                                    <xsl:value-of select="format-number(n1:Invoice/cac:LegalMonetaryTotal/cbc:PayableAmount, '###.##0,00', 'european')"/>
                                                    <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:PayableAmount/@currencyID">
                                                      <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:PayableAmount/@currencyID = 'TRY'">
                                                        <xsl:text>&#160;TL</xsl:text>
                                                      </xsl:if>
                                                      <xsl:if test="n1:Invoice/cac:LegalMonetaryTotal/cbc:PayableAmount/@currencyID != 'TRY'">
                                                        <xsl:value-of select="n1:Invoice/cac:LegalMonetaryTotal/cbc:PayableAmount/@currencyID"/>
                                                      </xsl:if>
                                                    </xsl:if>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td> 
                                    </tr>
                                    <tr class="notesMainTr">
                                      <td id="notes"> 
                                        <table style="width:800px;" cellpadding="0" cellspacing="0">
                                          <tr>
                                            <td>
                                              <hr/>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style="font-weight:bold">
                                              Atasun Optik'i tercih ettiğiniz için teşekkür ederiz.
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style="font-weight:bold">
                                              Hizmetlerimizden daha verimli faydalanmanızı sağlayacak hususları dikkatinize sunarız.
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style="height:7px;font-weight:bold">
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style="font-weight:bold">
                                              İade ve Değişim Şartları
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              1 - İade ve değişim haklarından faydalanmak için müşteri elinde hasarlanmamış, tekrar satılabilir 
                                              haldeki orjinal ürün, garanti belgesi, aksesuar ve orjinal fatura ile başvurmanız gerekmektedir.
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              * İlk alışverişten itibaren 7. Günün sonuna kadar iade hakkından yararlanabilir.
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              * İlk alışverişten 30. Günün sonuna kadar başka ürün ile değişim yapabilirsiniz.
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              * Keyfi değişim hakkından 1 kez faydalanabilirsiniz.Değişim yapılan ürün de iade edilmek istenirse ,
                                              değişim tarihinden değil, ilk alışveriş tarihinden itibaren 7 Günün sonuna kadar iade yapılabilir. 
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              * Değişim işlemlerinde , ürünler arasındaki fiyat farkları yeni alışveriş tarihindeki şekli ile müşteriye yansıtılacaktır.
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              2 - İade değişim işlemlerinde vergi mevzuatına uygun olarak yapılabilmesi için orjinal fatura beyan edilmesi
                                              gerekmektedir.<span style="font-weight:bold">Orjinal fatura ibraz edilmeyen ürünler için iade veya değişim işlemi yapılmaycaktır.</span>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              3 - Kredi kartı ile yapılan alışverişlerde iade işlemi için Kredi kartı ve işleme ait slip gerekmektedir.
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              4 - Hijyen kuralları gereği açılan lens ve solüsyonlarda iade/değişim işlemi yapılmamaktadır.
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              5 - Vergi Usul Kanunu gereği , şirket ve ticari şahısların iade edeceği, veya değiştireceği
                                              ürünler için Atasun Optik'e iade faturası düzenlenmesi zorunludur , iade faturası getirmeyen
                                              müşterilerimizin iade veya değişim işlemleri yapılamayacaktır.
                                            </td>
                                          </tr>
                                          <xsl:if test="//n1:Invoice/cac:InvoiceLine/cac:Item/cac:SellersItemIdentification/cbc:ID = 'HM00027'">
                                            <tr>
                                              <td>
                                                <hr/>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-weight:bold; color:#E38F15;">
                                                Turuncu Garanti Şartları
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                1-Turuncu Garanti, fatura tarihinden itibaren 1 yıl olup, 1 yıl içinde ve yalnızca bir kez kullanılabilir. Kullanım sonrasında sona erer ve yeniden uzatılamaz. Turuncu Garanti kapsamındaki optik gözlüğün 7 gün içinde iade edilmesi halinde, Turuncu Garanti hizmeti de iade edilmiş sayılır. Bunun haricinde Turuncu Garanti hizmetinin tek başına iadesi mümkün değildir. 
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                2-Turuncu Garanti yalnızca optik gözlük camlarında geçerli olup, Turuncu Garanti’den yararlanmak için hasarlı optik gözlük camının ibrazı gerekmektedir. Çalınan veya kaybolan ürünler garanti kapsamına alınmaz.
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                3-Turuncu Garanti’den faydalanmak için satış faturası ve Turuncu Garanti Şartlarını içeren belgenin ibrazı zorunludur. Turuncu Garanti Şartları’nın satış faturasında yer alması durumunda satış faturasının ibrazı yeterlidir.
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                4-Turuncu Garanti, Atasun Optik’in mağazadan yapılan alışverişlerde müşteri memnuniyeti kapsamında sunduğu 7 gün içinde iade ve 30 gün içinde değişim haklarının kullanılmasına engel olmaz
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                5-Turuncu Garanti kapsamında değişim yapılması halinde Turuncu Garanti şartları, Turuncu Garanti kapsamında değiştirilen yeni ürün için geçerli olmayacaktır. Değişim yapılan yeni ürün için üretici garanti süresi, yürürlükteki 6502 sayılı Tüketicinin Korunması Hakkındaki Kanun kapsamında değerlendirilir.
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                6-İlk satın alınan gözlüğünüze ait optik camların hasara uğraması durumunda, Turuncu Garanti kapsamında aynı numaraya göre aynı cam paketi değişimi ücretsiz olarak yapılır. Müşteri tarafından ek kaplama veya cam paketinde herhangi bir değişiklik istenmesi halinde oluşabilecek fiyat farkları için ilave ücret alınır, ancak müşteri tarafından düşük fiyatlı ürün talep edilmesi halinde fiyat farkı iadesi yapılmaz.
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                7-Ürünlerin üreticisinden kaynaklı hatalar için tedarikçisine inceleme kaydı oluşturulur. Bu süre azami 20 iş günüdür
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                8-Turuncu Garanti, üretici garantisi ile ilişkilendirilemez, üretici garantisi süresini etkilemez. 
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                9-Tüketicinin başta 6502 sayılı Tüketicinin Korunması Hakkındaki Kanun olmak üzere ilgili mevzuat uyarınca sahip olduğu tüm yasal hakları saklıdır.
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                <b>İHTİYARİ GARANTİ VEREN FİRMA BİLGİLERİ</b>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                <b>Unvanı: </b>ATASUN OPTİK PERAKENDE TİCARET A.Ş.
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size: 12px;">
                                                <b>Adresi: </b>Esentepe Mah. Keskin Kalem Sk. No:5 Şişli - İSTANBUL / TÜRKİYE
                                              </td>
                                            </tr>
                                            
                                            <tr>
                                              <td style="height:5px">
                                              </td>
                                            </tr>                                        
                                            <tr>
                                              <td style="font-size: 12px; text-align:center;">
                                                <b>Turuncu Garanti Tek Telefonla Destek Hizmeti:</b> <br/>
                                                Türkiye'nin her yerinden haftanın 7 günü 10:00–22:00 arası 444 67 85 numaralı Memnuniyet Hattımızdan ve tüm Atasun Optik noktalarından Turuncu Garanti ile ilgili bilgi alabilirsiniz.
                                              </td>
                                            </tr>
                                          </xsl:if>
                                          
                                          <tr>
                                            <td style="height:7px">
                                              
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style="font-weight:bold; text-align:center;">
                                              Atasun Optik Memnuniyet Hattı : 444 6785
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <hr/>
                                            </td>
                                          </tr>
                                          
                                        </table>
                                      </td>
                                    </tr> 
                                    
                                    
                                    
                                    <td>
                                      <xsl:if test="not(//n1:Invoice/cac:DespatchDocumentReference)">
                                        <div style="text-align: center; font-size: 11px; color: #696969; font-family: Tahoma, Geneva, sans-serif;">
                                          Bu fatura e-Arşiv kapsamında üretilmiştir. İrsaliye yerine geçer.
                                        </div>                                                                             
                                      </xsl:if>
                                    </td>
                                    
                                    
                                  </table>
                                </xsl:for-each>
                              </body>
                            </html>
                          </xsl:template>
                          <xsl:template match="dateFormatter">
                            <xsl:value-of select="substring(.,9,2)"/>-<xsl:value-of select="substring(.,6,2)"/>-<xsl:value-of select="substring(.,1,4)"/>
                          </xsl:template> 
                        </xsl:stylesheet>`;

    const tempDir = os.tmpdir();
    const tempXmlPath = path.join(tempDir, 'ubl-temp.xml');
    const tempXsltPath = path.join(tempDir, 'ubl-temp.xslt');

    fs.writeFileSync(tempXmlPath, xmlString, 'utf-8');
    fs.writeFileSync(tempXsltPath, xsltString, 'utf-8');

    return new Promise((resolve, reject) => {
      xslt4node.transform(
        {
          sourcePath: tempXmlPath,
          xsltPath: tempXsltPath,
          result: String,
        },
        (err: any, result: any) => {
          if (err) reject(err);
          else resolve(result);
        },
      );
    });
  }
}
