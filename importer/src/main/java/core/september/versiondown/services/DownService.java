package core.september.versiondown.services;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.logging.Level;

import org.jsoup.Connection.Method;
import org.jsoup.Connection.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import core.september.versiondown.data.models.Translation;
import core.september.versiondown.models.HomeLink;
import core.september.versiondown.models.LinkModel;
import io.reactivex.Observable;
import lombok.extern.java.Log;

@Log
@Service
public class DownService {
	
	private final static String url = "https://www.skuola.net";
	//private final static String url = "http://172.17.0.1:7070/demo.html";
	
	private Document getDocument(String postfix) throws IOException {
		try {
			Response resp = Jsoup.connect(url+postfix)
					.header("User-Agent", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0")
					.header("Pragma","no-cache")
					.header("Cache-Control","no-cache")
					.method(Method.GET)
					.execute();
			
			return resp.parse();
		}
		
		catch (IOException e) {
			
			log.logp(Level.WARNING,this.getClass().getSimpleName(),String.format("getDocument(%s)",postfix), e.getMessage(), e);
			throw e;
		}
			
					//.get();

	}
	
	public Observable<Element> getAuthorBlocks() throws IOException {
		Document doc = getDocument("/versioni-latino");
		return Observable.fromIterable(doc.select("dl"));
	}
	
	public Observable<Element> getContentForSelecor(LinkModel link,String selector) throws IOException {
		Document doc = getDocument(link.getLink());
		return Observable.fromIterable(doc.select(selector));
	}
	
	public Document getDocument(LinkModel link) throws IOException {
		return getDocument(link.getLink());
	}
	
	public Observable<Element> getContentForSelecor(Document doc,String selector) throws IOException {
		return Observable.fromIterable(doc.select(selector));
	}
	
	
	public HomeLink getHomeLinks(Element element,HomeLink parent) {
		String href = element.select("a").first().attr("href");
		String title = element.select("a").first().attr("title");
		String text = element.select("a").first().text();
		
		HomeLink hm = new HomeLink();
		hm.setText(text);
		hm.setDesc(title);
		hm.setLink(href);
		hm.setParent(parent);
		
		
		return hm;
	}

	public Translation compilaTraduzione(Element versionElPage, HomeLink link,Translation t) {
		//log(versionElPage);
		String testo = versionElPage.select(".testo").text().replaceAll(versionElPage.select(".testo .bold").text(), "");
		String trad = versionElPage.select(".traduzione").text().replaceAll(versionElPage.select(".traduzione .bold").text(), "");
		//log(testo);
		//log(trad);
		//testo  = versionElPage.select(".testo").first().childNodes().stream().reduce(first,second -> second).get();
		
		//log.info(String.format("%s\n%s", testo,trad));
		t.setOriginale(testo);
		t.setTraduzione(trad);
		return t;
	}
	
	/*private void log(Object content)  {
		try {
			Files.write(Paths.get("result.log"), (content + System.lineSeparator()).getBytes(),StandardOpenOption.CREATE,StandardOpenOption.APPEND);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}*/



	
}
