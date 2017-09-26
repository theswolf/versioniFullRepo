package core.september.versiondown;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import core.september.versiondown.data.models.Author;
import core.september.versiondown.data.models.Translation;
import core.september.versiondown.data.models.Version;
import core.september.versiondown.data.service.DataService;
import core.september.versiondown.imagedownloader.ImageDownloader;
import core.september.versiondown.models.HomeLink;
import core.september.versiondown.services.DownService;
import core.september.versiondown.services.LogService;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	private DownService downService;
	
	@Autowired
	private ImageDownloader imageDownloader;
	
	@Autowired DataService dataService;
	@Autowired LogService log;
	
	@Override
	public void run(String... arg0) throws Exception {
		System.out.println("Start ok");
		retrieveImages();
	}
	
	private void retrieveImages() {
		imageDownloader.rerieveImages();
	}

	
	private void importData() throws Exception {
		
		
		
		
		downService.getAuthorBlocks().subscribe(elNext -> {
			//log.info("*********************LEVEL 1*********************");
			HomeLink authorLink = downService.getHomeLinks(elNext,null);
			//log.info(authorLink.toString());
			//Author currentAuthor = dataService.insertAuthorIfMissing(authorLink);
			downService.getContentForSelecor(authorLink,"dl").subscribe(elInnerNext -> {
				//log.info("*********************LEVEL 2*********************");
				
				HomeLink firstChild = downService.getHomeLinks(elInnerNext,authorLink);
				//Version currentVersion = dataService.insertVersionIfMissing(firstChild);
				firstChild.getParent();
				//dataService.addVersionToAuthor(currentAuthor, currentVersion);
				
				//log.info(firstChild.toString());
				downService.getContentForSelecor(firstChild,".list_box")
						.subscribe(
								elVersionPage -> {
									//log.info("*********************LEVEL 3*********************");
									
									HomeLink secondChild = downService.getHomeLinks(elVersionPage,firstChild);
									//log.info(secondChild.toString());
									//Translation currentTranslation = dataService.insertTranslation(secondChild);
									//dataService.addTranslationToVersion(currentVersion,currentTranslation);
									//gestire pagina finale scaricata
									downService.getContentForSelecor(secondChild,"#versione").subscribe(
											versionElPage -> {
												//log.info("*********************LEVEL 4*********************");
												
												Author author = dataService.insertAuthorIfMissing(secondChild.getParent().getParent());
												Version version = dataService.insertVersionIfMissing(secondChild.getParent());
												Translation translation = dataService.insertTranslation(secondChild);
												downService.compilaTraduzione(versionElPage,secondChild,translation);
												translation = dataService.saveTranslation(translation);
												try {
													dataService.addVersionToAuthor(author, version);
													
													dataService.addTranslationToVersion(version,translation);
												}
												
												catch (Exception e) {
													log.logEntity(author);
													log.logEntity(version);
													log.logEntity(translation);
													throw(e);
												}
												

											},
											error -> log.handleHerror(error)
											);
									//log.info("*********************END LEVEL 3*********************");
								},
								error -> log.handleHerror(error)
								);
				//log.info("*********************END LEVEL 2*********************");
			}, error -> log.handleHerror(error));
			//log.info("*********************END LEVEL 1*********************");
		}, error -> log.handleHerror(error));

	}
	
	

	public static void main(String[] args) throws Exception {
		Properties props = System.getProperties();
		props.setProperty("hibernate.enable_lazy_load_no_trans", "true");
		SpringApplication.run(Application.class, args);
	}

	/*
	 * public static void main(String args[]) { String[] lista = {"a","b","c"};
	 * StringBuilder sb = new StringBuilder();
	 * Arrays.asList(lista).forEach(sb::append); System.out.println(sb); }
	 */

}
