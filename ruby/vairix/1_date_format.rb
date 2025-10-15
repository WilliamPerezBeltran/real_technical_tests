=begin
An application requires different date formats to be converted
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
"20161219", "20121118"].

=end


# these are some phone numers 917-555-1234. Also, yuou can call me at 352.352.36 and of course I'm always reachable at (212)865-5d09  91734
# the colors of the rainvow hace many colorurs and the rainbow does not have a single colour.

require "date"

def transform_date_format(dates)
  regx = %r{[/-]}

  valid_dates =
    dates
      .select { |d| d.match(regx) }
      .map { |d| d.split(regx).map(&:to_i).sort }
      .map { |d| d[0..1].reverse << (d[2]) if d[1] > 12 }

  p valid_dates

  valid_dates.map do |date|
    Date.parse(date.map(&:to_s).join("/")).strftime("%Y%m%d")
  end
end

p transform_date_format(%w[2010/02/20 19/12/2016 11-18-2012]) # =>  ["20100220", "20161219", "20121118"]
