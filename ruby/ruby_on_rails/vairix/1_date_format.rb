require "date"

def transform_date_format(dates)
  regx = %r{[/-]}

  valid_dates =
    dates
      .select { |d| d.match(regx) }
      .map { |d| d.split(regx).map(&:to_i).sort }
      .map { |d| d[0..1].reverse << (d[2]) if d[1] > 12 }

  valid_dates.map do |date|
    Date.parse(date.map(&:to_s).join("/")).strftime("%Y%m%d")
  end
end

p transform_date_format(%w[2010/02/20 19/12/2016 11-18-2012 20130720]) # =>  ["20100220", "20161219", "20121118"]
