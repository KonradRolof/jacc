jacc
====

<p>New accordion script for jQuery<p>

Usage
=====

<p>The Plugin needs jQuery and must be included after the libary.</p>

<pre><code>&lt;!DOCTYPE html>
&lt;html>
&lt;head>
  ...
  &lt;script src="js/jquery-1.10.1.min.js">&lt;/script>
  &lt;script src="js/jacc.js">&lt;/script>
  ...
&lt;/head>
&lt;body>
  ...
  &lt;div class="accordion">
	&lt;h2 class="toggler">Toggler 1&lt;/h2>
	&lt;div class="togglerBox">
	  &lt;!-- CONTENT OF TOGGLERBOX 1 -->
	&lt;/div>
	&lt;h2 class="toggler">Toggler 2&lt;/h2>
	&lt;div class="togglerBox">
	  &lt;!-- CONTENT OF TOGGLERBOX 2 -->
	&lt;/div>
  &lt;/div>
  ...
&lt;/body>
&lt;/html>
</code></pre>

<p>Call the Plugin, the usual way in document ready function.</p>

<pre><code>...
&lt;script>
  $(document).ready(function(){
  	$('.accordion').jacc();
  });
&lt;/script>
...
</code></pre>

Options
=======

<table class="Table">
	<thead>
		<tr>
		    <th scope="col">Key</th>
		    <th scope="col">Default value</th>
		    <th scope="col">Description</th>
		</tr> 
	</thead>
    <tbody>
		<tr>
			<td>toggler</td>
			<td>'.toggler'</td>
			<td>CSS class of the clickable element whith point. (String)</td>
		</tr>
		<tr>
			<td>togglerBox</td>
			<td>'.togglerBox'</td>
			<td>CSS class of the containers that slideUp/slideDown. (String).</td>
		</tr>
		<tr>
			<td>openFirst</td>
			<td>false</td>
			<td>Opens first container of accordion on page load. (Boolean)</td>
		</tr>
		<tr>
			<td>fxSpeed</td>
			<td>500</td>
			<td>Speed of slideUp/slideDown animation. (String).</td>
		</tr>
		<tr>
			<td>animationSpeed</td>
			<td>500</td>
			<td>Specifies the animation speed of the page transitions. (Number)</td>
		</tr>
		<tr>
			<td>easingIn</td>
			<td>''</td>
			<td>Add an jQuery Easing effect to slideDown animation. (String)</td>
		</tr>
		<tr>
			<td>easingOut</td>
			<td>''</td>
			<td>Add an jQuery Easing effect to slideUp animation. (String)</td>
		</tr>
		<tr>
			<td>focusSlide</td>
			<td>false</td>
			<td>Scroll document to current toggler. (Boolean)</td>
		</tr>
		<tr>
			<td>focusOffset</td>
			<td>-10</td>
			<td>Moves target point of scrolling document. (Number)</td>
		</tr>
		<tr>
			<td>focusFxSpeed</td>
			<td>500</td>
			<td>Speed of document scroll animation. (Number)</td>
		</tr>
		<tr>
			<td>onSlideUp</td>
			<td>&nbsp;</td>
			<td>Callback parallel to slideUp animation. (Function)</td>
		</tr>
		<tr>
			<td>slideComplete</td>
			<td>&nbsp;</td>
			<td>Callback after slideDown animation completes. (Function)</td>
		</tr>
	</tbody>
</table>

Status
======

<ul>
	<li>Version 0.3 - fix identifier problem with ops.this: changed to ops._this</li>
	<li>Version 0.2 - Add some new functions (alpha)</li>
	<li>Version 0.1 - Startbuild of script (alpha)</li>
</ul>

Licence
=======

<p>The plugin jacc is under <a href="http://opensource.org/licenses/MIT" title="Opensource.org" target="_blank">MIT licence</a> and <a href="http://www.gnu.org/licenses/gpl.txt" target="_blank" title="GNU GENERAL PUBLIC LICENSE Version 3">GNU licence</a>.</p>
<p>Copyright &#169; 2014 Konrad Rolof</p>