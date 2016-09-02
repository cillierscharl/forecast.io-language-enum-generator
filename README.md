# forecast.io-language-enum-generator

Generate a C# Enum from the Forecast.io API docs updated online - this tool is used to update [forecast.io-csharp](https://github.com/f0xy/forecast.io-csharp)

* Make an HTTP request to the latest update of the ForecastIO documentation
* Extract all the languages out of the HTML using `jsdom`
* Build up a C# Enumeration using the responses
   * Add decorators for languages that contain `-`
   * Add `@` for languages that match C# restricted keywords

## Usage

```
npm install
node app
```

###### Generated output example from Forecast IO v2

![App output](http://i.imgur.com/y3x3kZF.png)
