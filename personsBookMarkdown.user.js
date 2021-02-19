// ==UserScript==
// @name        Print personsbook.com Course List
// @namespace   Violentmonkey Scripts
// @match       *://www.personsbook.com/udemy-courses*
// @grant       none
// @version     1.5
// @author      gogvale
// @description Logs to console a markdown with a list of course names of the current personsbook.com post
// @license     GPL-3.0
// ==/UserScript==

courseList = [...document.querySelectorAll('p>span')]
  .map(e=>e.textContent)
  .map(e=>/^—+/.test(e) ? null : e)
  .map(e=>/daily/i.test(e) ? null : e)
  .map(e=>/^http/.test(e) ? null : e)
  .map(e=>/^Get Followers/.test(e) ? null : e)
  .map(e=>/Facebook|YouTube|Tiktok|Instagram/i.test(e) ? null : e)
  .map(e=>/[^\x20-\x7E]+/.test(e)?  null : e)

  .filter(e=>e);

courseList = [...new Set(courseList)].sort().map(e=>"- "+e) .join('\n')
string = `**Cursos gratis del día (${new Date().toLocaleDateString("es-MX")})**\n${document.URL}\n` + "```markdown\n"+courseList+"\n```";

console.log(string);