# StepBack 
[![Build Status](https://travis-ci.org/celber/stepback.svg?branch=master)](https://travis-ci.org/celber/stepback)

Simple and plain JavaScript framework. Basically jQuery for modern web applications.

## Getting Started

StepBack runs in browser, there is very little effort to set things up.


### Installing

You can either download files from `dist` directory and include them in your source code
or include HTML tags *after body section* for **production** instances

```
<link href='https://cdn.jsdelivr.net/gh/celber/stepback/dist/sb.css' rel='stylesheet' />
<script src='https://cdn.jsdelivr.net/gh/celber/stepback/dist/sb.min.js' type='text/javascript'></script>
```

or this for **development** instance

```
<link href='https://cdn.jsdelivr.net/gh/celber/stepback/dist/sb.css' rel='stylesheet' />
<script src='https://cdn.jsdelivr.net/gh/celber/stepback/dist/sb.js' type='text/javascript'></script>
```

Check [documentation](./api/) or [examples](/playground/index.html) to see how to write your application.

## Roadmap

### Works

* Class-like component definition
* DOM control
* DOM queries
* Component management
* String templates
* Container component
* "Component component" :)

### To be done

* Vertical/Horizontal split layout
* Finish and separate Zendesk Garden bindings
* AJAX utilities
* Datastore
* Improve DOM rendering

## Built with

* [Zendesk Garden](https://garden.zendesk.com/) - The components llibrary built-in

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Dariusz Damian Jakubowski** - *Initial work* - [Blog](https://blog.celber.pl)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the GNU General Public License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to Stack Overflow without whom this would be never done
