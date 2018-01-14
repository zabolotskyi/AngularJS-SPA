<h1>Simple AngularJS SPA</h1>

Данные приложения необходимо сохранить в LocalStorage либо реализовать REST API для сохранения информации на сервере. Учтите необходимость изменения источника данных приложения в будущем.


<p>This single page application gives the ability to manipulate the data about authors and their books.</p>

<p>Available data manipulations:</p>

<ul>
	<li>Adding new authors/books</li>
  <li>Editing authors/books</li>
  <li>Deleting authors/books</li>
  <li>Sorting authors/books</li>
</ul>

<p>All forms have user input validation.</p>

<p>There are two possible options for data source: Local Storage and Deployd. Local Storage is the default option. To enable server data manipulation go to js/app.js file and replace deploydServiceProvider.serverEnabled(false) with true argument on line 22. </p>

<p><a href="https://zabolotskyi.github.io/AngularJS-SPA">Live demo.</a></p>
