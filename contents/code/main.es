/***************************************************************************
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA .        *
 ***************************************************************************/
 
function init()
{
    comic.comicAuthor = "Tycho and Gabe";
    comic.firstIdentifier = "1998/11/18";
    comic.websiteUrl = "http://penny-arcade.com/";
    comic.curl = "http://penny-arcade.com/comic/";
    //comic.title = "PvP";
    comic.requestPage(comic.curl, comic.User);
}
 
function pageRetrieved(id, data)
{
    if(id==comic.User){
       var re = new RegExp("name=\"return_to\" value=\"http://penny-arcade.com/comic/(\\d{4})/(\\d{2})/(\\d{2})");
       print(re);
       var match = re.exec(data);
       //print(match)
       if(match!=null){
	  //fecha=match[1]+match[2]+match[3];
	  comic.lastIdentifier = match[1]+"/"+match[2]+"/"+match[3];
//	  print(comic.lastIdentifier.toString("yyyy/MM/dd"));
	  url=comic.curl+comic.identifier.toString("yyyy/MM/dd/");
	  comic.requestPage(url, comic.Page);
	  print(url);
	  if(comic.identifier.dayOfWeek() == 1){
	     comic.previousIdentifier=comic.identifier.addDays(-3);
	     comic.nextIdentifier=comic.identifier.addDays(2);
	  }
	  if(comic.identifier.dayOfWeek() == 3){
	     comic.previousIdentifier=comic.identifier.addDays(-2);
	     comic.nextIdentifier=comic.identifier.addDays(2);
	  }
	  if(comic.identifier.dayOfWeek() == 5){
	     comic.previousIdentifier=comic.identifier.addDays(-2);
	     comic.nextIdentifier=comic.identifier.addDays(3);
	  }
	  print(comic.previousIdentifier+" -.- "+comic.nextIdentifier);
       }else{
	   comic.error();
       }       
    }
    if(id==comic.Page){
      //print("ERE");
       var re = new RegExp("src=\"(http://art.penny-arcade.com/photos/[^\\.]*\\.jpg)\" alt=\"([^\"]*)\"");
       var match = re.exec(data);
       print(re);
       if(match!=null){
	  print(match[1]+" || "+match[2]+"||");
	  comic.additionalText = match[2];
	  //comic.title = "Penny Arcade";
	  comic.requestPage(match[1], comic.Image);
       }else{
	   comic.error();
	   return;
       }
    }
}

