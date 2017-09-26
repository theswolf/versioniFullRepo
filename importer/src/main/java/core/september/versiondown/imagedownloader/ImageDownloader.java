package core.september.versiondown.imagedownloader;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.Connection.Method;
import org.jsoup.Connection.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.io.ByteStreams;

import core.september.versiondown.data.models.Author;
import core.september.versiondown.data.repos.AuthorRepo;

@Service
public class ImageDownloader {

	private final static String baseUrl = "https://www.bing.com/images/search?q=";
	private final static String basePath = "/home/developer/git/versioniApp/importer/images/";

	@Autowired
	private AuthorRepo authorRepo;

	private void writeSingleImage(Author author, URL imageUrl, AtomicInteger counter) {

		try {
			// URL url = new URL(String.format("%s%s",
			// baseUrl,author.getName()));
			URLConnection connection = imageUrl.openConnection();

			byte[] target = ByteStreams.toByteArray(connection.getInputStream());
			
			Path path = Paths.get(String.format("%s", basePath));
			try {
			    Files.createDirectories(path);
			} catch (IOException e) {
			    System.err.println("Cannot create directories - " + e);
			}

			Files.write(Paths.get(String.format("%s%s%s%s", basePath, author.getName().replace(" ", ""),counter.getAndIncrement(), ".jpg")), target,
					StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private void retrieveSingleImage(Author author) {

		try {
			// URL url = new URL(String.format("%s%s",
			// baseUrl,author.getName()));
			
			Response resp = Jsoup.connect(String.format("%s%s", baseUrl,author.getName().replace(" ", "%20").concat("%20Autore%20Latino")))
					.header("User-Agent", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0")
					.header("Pragma","no-cache")
					.header("Cache-Control","no-cache")
					.method(Method.GET)
					.execute();
			
			Document doc = resp.parse();
			AtomicInteger counter = new AtomicInteger(0);
			
			
			doc.getElementsByClass("mimg").stream().forEach(el -> {
				String src = el.attr("src");
				try {
					writeSingleImage(author, new URL(src),counter);
				} catch (MalformedURLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			});
			
			
			
			/*URL url = new URL(String.format("%s%s", baseUrl,author.getName()));
			URLConnection connection = url.openConnection();

			String line;
			StringBuilder builder = new StringBuilder();
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			while ((line = reader.readLine()) != null) {
				builder.append(line);
			}

			JSONObject json = new JSONObject(builder.toString());
			String imageUrl = json.getJSONObject("responseData").getJSONArray("results").getJSONObject(0)
					.getString("url");

			writeSingleImage(author, new URL(imageUrl));*/
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void rerieveImages() {
		try {

			List<Author> authors = (List<Author>) authorRepo.findAll();

			authors.stream().forEach(this::retrieveSingleImage);

			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
