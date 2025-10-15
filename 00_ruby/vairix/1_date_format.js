/*An application requires different date formats to be converted
into one common date format.

Implement the function transform_date format which accepts a list
of dates as strings, and returns a new list of strings representing
dates in the format of YYYYMMDD. All incoming dates will be valid
dates, but only those in one of the following formats:
YYYY/MM/DD, DD/MM/YYYY, and MM-DD-YYYY should be
included in the returned list, where YYYY, MM, and DD are
numbers representing year, month, and day, respectively.

For example, transform_date_format('2010/02/20", "19/12/2016",
"11-18-2012", "20130720"]) should return the list ["20100220",
"20161219", "20121118"].*/

function transform_date_format(dates){
	let regex = /\b\d{4}[/|-]\d{2}[/|-]\d{2}\b/

	YYYY/MM/DD
	DD/MM/YYYY
	MM-DD-YYYY

	2010/02/20
	19/12/2016
	11-18-2012
	20130720

}

  

 // transform_date_format(["2010/02/20", "19/12/2016", "11-18-2012", "20130720"]) # =>  ["20100220", "20161219", "20121118"]
 // transform_date_format(["2010/02/20", "19/12/2016", "11-18-2012", "20130720"])
 console.log(transform_date_format(["2010/02/20", "19/12/2016", "11-18-2012", "20130720"]))
/*

/\b\d{4}[/|-]\d{2}[/|-]\d{2}\b/

*/