FreshDeliveryDemo
=================

This is a demo site that embeds [JasperReports Server](http://www.jaspersoft.com) using the [Visualize.js](http://community.jaspersoft.com/project/visualizejs) framework

Code: https://github.com/TIBCOSoftware/JS-FDSample

Live Demo: <a https://www.jaspersoft.com/fresh-delivery">https://www.jaspersoft.com/fresh-delivery</a>

Author(s): Daniel Petzold, Sherman Wood, Mariano Luna, Peter Mcrae

Version: 4.0

Description
---------------
The sample is designed to showcase the features of TIBCO Jaspersoft's embedded analytics framework and highlights Visualize.js.
I've used a set of reports that are included in this sample that depend on the Foodmart Sample dataset that is provided in the standard trial installation of JasperServer Professional.

Essentially this is a demo app (Fresh Delivery) with a set of reports integrated within. It runs form a WebServer since it only uses HTML and Javascript so there is no specific requirements for the webserver. If you would like to use a hosted version of this application, please visit: <a href="https://www.jaspersoft.com/fresh-delivery">https://www.jaspersoft.com/fresh-delivery</a>

Requirements / Dependencies
---------------
- A [JasperReports Server v6+](http://www.jaspersoft.com/three-ways-test-drive-jaspersoft-bi-software) installed
- A web server to host this sample. I use Apache HTTPD but you can use any that you like.

### Installation Steps
---------------
1. Unzip the release (or clone the repo) into your web server's web root. The instructions assume that this location is called 'FRESHDELIVERY_PATH'
1. Import /JapserServerResources/repoExport.zip to your JasperReportsServer 6+ Pro instance. [Check this link if you do not know how.](http://community.jaspersoft.com/documentation/jasperreports-server-administration-guide-beta/import-and-export-through-web-ui#import-export_2353750880_1044705) and if you like the command line go to your JRS buildomatic folder and just `./js-import.sh --input-zip FRESHDELIVERY_PATH/JasperServerResources/repoExport.zip`
1. Modify your jasperreports.properties to allow JavaScript functions in the HTML5 Charting Library
	1. Locate your jasperreports.properties in JasperReportsServer  `<tomcat-home>/webapps/jasperserver-pro/WEB-INF/classes/jasperreports.properties`
	1. Add this line at the end of the file:  `com.jaspersoft.jasperreports.highcharts.function.properties.allowed=true`
1. This sample needs to add Lat/Long coordinates to the store table on the foodmart database
	1. the sql file with this changes is located in the repo FRESHDELIVERY_PATH/JasperServerResources/foodmart-store-update.sql
	1. use that sql script to update your DB, at the command prompt (using default username and port, this may change for you): `psql -p 5432 -U postgres -d foodmart -a -f FRESHDELIVERY_PATH/JasperServerResources/foodmart-store-update.sql` 
1. The pages expect JasperServer to be accessible in `http://localhost:8080/jasperserver.pro` since that is normally not the case you will need to change this. For example if your jasperserver is located in `http://my.jasperserver.com:8080/jasperserver.pro` just open a terminal and enter:
```
$ sed -i 's~localhost~my.jasperserver.com~' /var/www/html/freshdelivery/go-green.html
$ sed -i 's~localhost~my.jasperserver.com~' /var/www/html/freshdelivery/top-sellers.html
$ sed -i 's~localhost~my.jasperserver.com~' /var/www/html/freshdelivery/healthy-choices.html
```
1. The script is hardcoded to login using joeuser/joeuser if you need to change this, do so in `/config/config.json`
1. Go to http://<your-server>/JS-FDSample/ 
1. Enjoy!!!

####How to turn off the chart selector icon for specific charts in JRS
- In JSS go to the main properties panel and on the Property Expressions select the "…” button.
- Select Add and for the Property Name use: com.jaspersoft.jasperreports.highcharts.interactive
- Set the value to `true`. Do not select “use an Expression” unless you are going to use one for setting this property.


LICENSE AND COPYRIGHT NOTIFICATION
==================================

 Copyright (C) 2005 - 2018 Jaspersoft Corporation - All rights reserved.

 Unless you have purchased a commercial license agreement from Jaspersoft,
 the following license terms apply:

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU Affero  General Public License for more details.

 You should have received a copy of the GNU Affero General Public  License
 along with this program. If not, see <http://www.gnu.org/licenses/>.




