import static org.junit.Assert.*;

import java.io.IOException;
import java.util.logging.Level;

import org.jsoup.Jsoup;
import org.jsoup.Connection.Method;
import org.jsoup.Connection.Response;
import org.jsoup.nodes.Document;
import org.junit.Test;

import core.september.versiondown.services.DownService;

public class TestDown {
	
	private final static String url = "https://www.skuola.net/versioni-latino/catullo/liber-catullianus/sezione-1-nugae/carme-11";

	
	private Document getDocument(String postfix) throws IOException {
		try {
			
			return Jsoup.parse(this.getClass().getClassLoader().getResourceAsStream("data.html"), "UTF-8","");
			
		}
		
		catch (IOException e) {
			
			throw e;
		}
			
					//.get();

	}
	
	
	@Test
	public void test() throws IOException {
		Document doc = getDocument(url);
		String testo = doc.select(".testo").text().replaceAll(doc.select(".testo .bold").text(), "");
		String trad = doc.select(".traduzione").text().replaceAll(doc.select(".traduzione .bold").text(), "");
		
		System.out.println(doc);
		
		System.out.println(testo);
		System.out.println(trad);
	}

}
