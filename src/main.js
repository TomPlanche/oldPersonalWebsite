/* ========================================================================== */
/*                          ABOUT-ME SIZE MANAGEMENT                          */
/* ========================================================================== */
/* ---------------------------------- SETUP --------------------------------- */

let top_comment_line = document.querySelector("#comment-start");
let top_end_line = document.querySelector("#comment-end");


/**
 * Fill in the line numbers taking into account the largest line number
 * in order to align the numbers to the right adding spaces if necessary
 */
let fill_line_numbers = () => {
	let line_numbers = document.querySelectorAll(".line_number");
	let max_line_number = line_numbers.length.toString().length;
	line_numbers.forEach((line_number, i) => {
		i++; // We start from 1
		let space_needed = " ".repeat(max_line_number - i.toString().length);
		line_number.innerHTML = `${space_needed}${i}`;
	});
}


let comment_lines = []; // Contains the text content of the <p>'s.
let comment_lines_2 = []; // Contains the text content of the <p>'s.
let comment_ps = document.querySelectorAll(".code_line p");

comment_ps.forEach(p => {
	comment_lines.push(p.innerHTML);
});

comment_ps.forEach(p => {
	comment_lines_2.push(p.textContent);
});


/**
 * Return the minimum line size of the comment.
 * @returns {number} minimum line size of the comment.
 */
let get_minimun_line_size = () => {
	let min_size = 0;

	// Check if there is a line longer than the desired size.
	comment_ps.forEach((p, i) => {
		let comment_size = comment_lines_2[i].length;
		
		if (comment_size > min_size) {
			min_size = comment_size;
		}
	});
	
	return min_size + 4; // Add 4 for the stars and the spaces
}

/**
 * Format the comment to the desired line size.
 * @param {number} lineSize
 */
let format_comment = (lineSize) => {
	
	let min_size = get_minimun_line_size();
	// Check if the line size is smaller than the minimum size
	lineSize = min_size > lineSize ? min_size - 2 : lineSize - 2; // -2 for the stars
	
	top_comment_line.innerHTML = `/*${"*".repeat(lineSize - 1)}\\`;
	top_end_line.innerHTML = `\\${"*".repeat(lineSize)}/`;
	
	comment_ps.forEach((p, i) => {
		if (p.id === "") {
			let comment_size = comment_lines_2[i].length;
		
			let spaces_needed = lineSize - comment_size - 2;
			
			let spacesBefore = " ".repeat(Math.floor(spaces_needed / 2));
			let spacesAfter = " ".repeat(Math.ceil(spaces_needed / 2));
			
			p.innerHTML = `* ${spacesBefore}${comment_lines[i]}${spacesAfter} *`;
		}
	});
}


/* ----------------------------- SLIDER CHANGES ----------------------------- */
/**
 * Prepare the slider to change the line size.
 */
let prepare_slider = () => {
	let slider = document.querySelector("#slider_line_width");
	let slider_value = document.querySelector("#slider-value-container");
	
	slider_value.innerHTML = slider.value;
	
	slider.addEventListener('input', () => {
		slider_value.innerHTML = slider.value;
		format_comment(slider.value);
	});
}

/**
 * Return the slider value.
 * @returns {*}
 */
let get_slider_value = () => {
	return document.querySelector("#slider_line_width").value;
}


/* ========================================================================== */
/*                                  FILE TABS                                 */
/* ========================================================================== */
let files = document.querySelectorAll('.file');
let content = document.querySelector('.content');

/**
 * Add 'active' class to the clicked file and remove it from the others.
 * @param {NodeListOf<Element>} files_list
 * @param {string} fileId
 * @param {string} class_to_add
 */
let underlineFile = (files_list, fileId, class_to_add) => {
    files_list.forEach(file => {
        if (file.id === fileId) {
            file.classList.add(class_to_add);
        } else {
            file.classList.remove(class_to_add);
        }
    });
};

let intervalle_instance_ecrire;
let intervalle_instance_effacer;
/**
 * Change the content of the page depending on the clicked file.
 * @param {string} fileId
 */
let fillContent = (fileId) => {
  content.classList.remove("padding");
	content.innerHTML = "";

  switch (fileId) {
    case 'file-1':
      content.innerHTML = hello_content;
      content.classList.add("padding");
			
      clearInterval(intervalle_instance_ecrire);
      clearInterval(intervalle_instance_effacer);
			intervalle_instance_ecrire = setInterval(Ecrire, 85);
      break;
		case 'file-2':
			console.log("file-2");
			clearInterval(intervalle_instance_ecrire);
      clearInterval(intervalle_instance_effacer);
			content.innerHTML = about_me_content;
			
			comment_lines = []; // Contains the text content of the <p>'s.
			comment_lines_2 = []; // Contains the text content of the <p>'s.
			comment_ps = document.querySelectorAll(".code_line p");
			
			comment_ps.forEach(p => {
				comment_lines.push(p.innerHTML);
			});
			
			comment_ps.forEach(p => {
				comment_lines_2.push(p.textContent);
			});
			
			top_comment_line = document.querySelector("#comment-start");
			top_end_line = document.querySelector("#comment-end");
			
			prepare_slider();
			format_comment(get_slider_value());
			fill_line_numbers();
			
			
			
			break;
		case 'file-3':
			clearInterval(intervalle_instance_ecrire);
      clearInterval(intervalle_instance_effacer);
			content.innerHTML = portfolio_content;
			prepare_portfolio();
			break;
	  case 'file-contact':
			clearInterval(intervalle_instance_ecrire);
      clearInterval(intervalle_instance_effacer);
			content.innerHTML = contact_me_content;
			
			fill_line_numbers();
			break;
		default:
			clearInterval(intervalle_instance_ecrire);
      clearInterval(intervalle_instance_effacer);
			content.innerHTML = hello_content;
			break;
  }
}

// Iterate over the files and add click event listeners.
files.forEach(file => {
	file.addEventListener('click', () => {
		underlineFile(files, file.id, "active");
		fillContent(file.id);
	});
});

let files_vnavbar = document.querySelectorAll('.file-vnavbar');

files_vnavbar.forEach(file => {
	file.addEventListener('click', () => {
		underlineFile(files_vnavbar, file.id, "active");
	});
});

let phrase  = [
    "Developer",
    "Student"
];

let part = 0;
let part_index = 0;
let elem = document.querySelector("#change");

/**
 * Writes the text of the #change element.
 */
function Ecrire() {
	let elem = document.querySelector("#change");
	
  let texte = phrase[part].substring(0, part_index + 1);
  elem.innerHTML = texte;
  part_index++;

  if (texte === phrase[part]) {
      clearInterval(intervalle_instance_ecrire);
      setTimeout(function() {
          intervalle_instance_effacer = setInterval(Effacer, 25);
      }, 600);
  }
}

/**
 * Delete the text of the #change element.
 */
function Effacer() {
	let elem = document.querySelector("#change");
	
	if (elem === null) {
		return;
	}
	
  let texte = phrase[part].substring(0, part_index - 1);
  
	elem.innerHTML = texte;
  part_index--;

  if (texte === '') {

      if (part === (phrase.length - 1))
          part = 0;
      else
          part++;

          part_index = 0;

      clearInterval(intervalle_instance_effacer);
      setTimeout(function() {
          intervalle_instance_ecrire = setInterval(Ecrire, 85);
      }, 600);
  }
}

intervalle_instance_ecrire = setInterval(Ecrire, 85);


let portfolio_links = [
		"https://github.com/TomPlanche/daftWebsite",
		"https://github.com/TomPlanche/R2-04",
		"https://github.com/TomPlanche/S2-04",
		"https://github.com/TomPlanche/S2-02",
		"https://github.com/TomPlanche/VSCodeSite",
		"#"
]

/**
 * Add click event listeners to the portfolio links.
 * @param {string} id
 */
let portfolio_item_clicked = (id) => {
	let index = parseInt(id.split("-")[1]);
	window.open(portfolio_links[index], "_blank");
}

let prepare_portfolio = () => {
	let portfolio_items = document.querySelectorAll(".projet");
	
	portfolio_items.forEach(item => {
		item.addEventListener('click', () => {
			portfolio_item_clicked(item.id);
		});
	});
}


let hello_content = "<div class=\"horiz-half l\">\n" +
										"    <div class=\"vertical-half t\">\n" +
										"        <h4>Hi all. I'm</h4>\n" +
										"        <h1>Tom Planche</h1>\n" +
										"        <h2>> <span id=\"change\"></span><span id=\"blink\">_</span></h2>\n" +
										"    </div>\n" +
										"    <div class=\"vertical-half b\">\n" +
										"        <h4 class=\"comment\">\n" +
										"            // 20yo French student\n" +
										"        </h4>\n" +
										"        <h4 class=\"comment\">\n" +
										"            // Student at the IUT of Bayonne\n" +
										"        </h4>\n" +
										"        <h4>\n" +
										"            <span class=\"const\">const</span> <span class=\"var\">githubLink</span> = <span class=\"link\"><a href=\"https://github.com/TomPlanche\">https://github.com/TomPlanche</a></span>\n" +
										"        </h4>\n" +
										"    </div>\n" +
										"</div>\n" +
										"<div class=\"horiz-half r\">\n" +
										"    <img src=\"src/imgs/louis-tom.png\" alt=\"My Profile Picture\">\n" +
										"</div>"

let about_me_content =  "<div class=\"inside\">\n" +
		"                <div class=\"horiz-half editor\">\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p id=\"comment-start\"></p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p>* About Me *</p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p>************</p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p></p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p>I'm a French student in computer science</p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p>based in Bayonne, France.</p>\n" +
		"                    </div>\n" +
		"    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p>Studying at the <a href=\"https://www.iutbayonne.univ-pau.fr/presentation.html\">Bayonne Institute of Technology</a>.</p>\n" +
		"                    </div>\n" +
		"    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p></p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p>I code in</p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p>C++, Python, Swift, Bash, HTML+Scss+Js</p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p></p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p>and I use</p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p><a href=\"https://code.visualstudio.com\">VSCode</a>, <a href=\"https://www.jetbrains.com/webstorm/\">WebStorm</a>, <a href=\"https://www.jetbrains.com/pycharm/\">PyCharm</a>, <a href=\"https://developer.apple.com/xcode/\">xCode</a>, <a href=\"https://www.adobe.com/products/illustrator.html\">Illustrator</a></p>\n" +
		"                    </div>\n" +
		"                    <div class=\"code_line\">\n" +
		"                        <span class=\"line_number\"></span>\n" +
		"                        <p id=\"comment-end\"></p>\n" +
		"                    </div>\n" +
		"                </div>\n" +
		"                <div class=\"horiz-half snippet-show\">\n" +
		"                    <h2>Have some fun and move the slider !</h2>\n" +
		"                    <p>Line width <span id=\"slider-value-container\"></span></p>\n" +
		"                    <input type=\"range\" name=\"line width\" id=\"slider_line_width\" min=\"30\" value=\"60\" max=\"90\" step=\"2\">\n" +
		"                    <p>Lets see how I have done this !</p>\n" +
		"                </div>\n" +
		"\n" +
		"            </div>"

let portfolio_content = "<div class=\"container-projets\">\n" +
												"    <div class=\"projet\" id=\"projet-1\">\n" +
												"        <div class=\"container-projet\">\n" +
												"            <div class=\"title\">\n" +
												"                <h3>\n" +
												"                    Daft Punk Website\n" +
												"                </h3>\n" +
												"            </div>\n" +
												"            <div class=\"description\">\n" +
												"                <p>\n" +
												"                    This website is a project I did to see if I could make a website with a lot of animations.\n" +
												"                    I used HTML5, SCSS and TS.\n" +
												"                </p>\n" +
												"            </div>\n" +
												"        </div>\n" +
												"    </div>\n" +
												"    <div class=\"projet\" id=\"projet-2\">\n" +
												"        <div class=\"container-projet\">\n" +
												"            <div class=\"title\">\n" +
												"                <h3>\n" +
												"                    Assembly Class Exercices\n" +
												"                </h3>\n" +
												"            </div>\n" +
												"            <div class=\"description\">\n" +
												"                <p>\n" +
												"                    Exercices to learn Assembly language.\n" +
												"                    In this one, I display \"Hello World\" in the console and underline it.\n" +
												"                </p>\n" +
												"            </div>\n" +
												"        </div>\n" +
												"    </div>\n" +
												"    <div class=\"projet\" id=\"projet-3\">\n" +
												"        <div class=\"container-projet\">\n" +
												"            <div class=\"title\">\n" +
												"                <h3>\n" +
												"                    Quite big dataframes handling in Python\n" +
												"                </h3>\n" +
												"            </div>\n" +
												"            <div class=\"description\">\n" +
												"                <p>\n" +
												"                    School project a friend and I did.\n" +
												"                    We handle ten or so csv files containing around 29k lines each.\n" +
												"                    We also used a direct connection to the database.\n" +
												"                    It concerns accidents in a france region.\n" +
												"                </p>\n" +
												"            </div>\n" +
												"        </div>\n" +
												"    </div>\n" +
												"    <div class=\"projet\" id=\"projet-4\">\n" +
												"        <div class=\"container-projet\">\n" +
												"            <div class=\"title\">\n" +
												"                <h3>\n" +
												"                    Shortest Path Search Algorithms in Python\n" +
												"                </h3>\n" +
												"            </div>\n" +
												"            <div class=\"description\">\n" +
												"                <p>Practical application of the shortest path search algorithms (Dijkstra, Bellmann Ford, Floyd Warshall...) and visualization of their execution step by step using a graphic library</p>\n" +
												"            </div>\n" +
												"        </div>\n" +
												"    </div>\n" +
												"    <div class=\"projet\" id=\"projet-5\">\n" +
												"        <div class=\"container-projet\">\n" +
												"            <div class=\"title\">\n" +
												"                <h3>\n" +
												"                    VSCode like portfoilio website\n" +
												"                </h3>\n" +
												"            </div>\n" +
												"            <div class=\"description\">\n" +
												"                <p>\n" +
												"                    A website I made to show my skills in web development.\n" +
												"                    I used HTML5, SCSS and TS.\n" +
												"                </p>\n" +
												"            </div>\n" +
												"        </div>\n" +
												"    </div>\n" +
												"    <div class=\"projet\" id=\"projet-6\">\n" +
												"        <div class=\"container-projet\">\n" +
												"            <div class=\"title\">\n" +
												"                <h3>\n" +
												"                        This website !\n" +
												"                </h3>\n" +
												"            </div>\n" +
												"            <div class=\"description\">\n" +
												"                <p>\n" +
												"                        This website is a project I did to see if I could make a website with a lot of interface changes but no refresh.\n" +
												"                    I used HTML5, SCSS and JS.\n" +
												"                </p>\n" +
												"            </div>\n" +
												"        </div>\n" +
												"    </div>\n" +
												"\</div>";

let contact_me_content =  "<div class=\"contact-view\">\n" +
		"\t            <div class=\"half\">\n" +
		"\t\t            <h2>Thanks for watching !</h2>\n" +
		"\t\t            <h3>Designed by <a href=\"https://www.behance.net/darelova\" class=\"keyword\">@darelova</a>, transformed and made by me.</h3>\n" +
		"\t            </div>\n" +
		"\t            <div class=\"half\">\n" +
		"\t\t\t\t\t<div class=\"editor\">\n" +
		"\t\t\t\t\t\t<div class=\"code_line\">\n" +
		"\t\t\t\t\t\t\t<span class=\"line_number\"></span>\n" +
		"\t\t\t\t\t\t\t<p><span class=\"keyword\">const</span> me = {</p>\n" +
		"\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t\t<div class=\"code_line\">\n" +
		"\t\t\t\t\t\t\t<span class=\"line_number\"></span>\n" +
		"\t\t\t\t\t\t\t<p>    name: <span class=\"string\">\"Tom Planche\"</span>;</p>\n" +
		"\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t\t<div class=\"code_line\">\n" +
		"\t\t\t\t\t\t\t<span class=\"line_number\"></span>\n" +
		"\t\t\t\t\t\t\t<p>    mail: <a class=\"string\" href=\"mailto:tomplanche@icloud.com\">\"tomplanche@icloud.com\"</a>;</p>\n" +
		"\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t\t<div class=\"code_line\">\n" +
		"\t\t\t\t\t\t\t<span class=\"line_number\"></span>\n" +
		"\t\t\t\t\t\t\t<p>    address: <span class=\"string\">\"Bayonne, France\"</span>;</p>\n" +
		"\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t\t<div class=\"code_line\">\n" +
		"\t\t\t\t\t\t\t<span class=\"line_number\"></span>\n" +
		"\t\t\t\t\t\t\t<p>    github: <a href=\"https://github.com/TomPlanche\" class=\"string\">\"@TomPlanche\"</a>;</p>\n" +
		"\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t\t<div class=\"code_line\">\n" +
		"\t\t\t\t\t\t\t<span class=\"line_number\"></span>\n" +
		"\t\t\t\t\t\t\t<p>};</p>\n" +
		"\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t</div>\n" +
		"                </div>\n" +
		"            </div>"
