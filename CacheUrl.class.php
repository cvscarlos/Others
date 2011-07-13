<?php
/*
* @author: Carlos Vinicius
*
* This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license,
* visit http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
*
* @Description: Classe para criar cache de arquivos através da URL dos mesmos e utilizar esta cache durante um período de dias pré estipulado
* @usage:	$a=new CacheUrl("http://www.gestaovarejo.com.br"); //definindo a url
* 			echo $a->getContent(); // retornando o conteúdo
* 			$a->emptyCache(); // Limpando o cache
*/


class CacheUrl
{
	private $cacheDir; //Diretório onde os arquivos vão ser armazenados
	private $cacheDays; //Número de dias em que o arquivo vai permanecer em cache
	private $urlCode;
	private $url;
	private $content;

	public function __construct($url){
        $this->cacheDir=PUBLIC_PATH."cache/";
        $this->cacheDays=1;
		$this->url=$url;
		$this->urlCode=urlencode($this->url);
	
		if(file_exists($this->cacheDir.$this->urlCode) && !$this->isFileOld()){
			$this->getFromFile();
		}
		else{
			$this->getFromUrl();
			$this->saveFile();
		}
		$this->isFileOld();
	}
	
	public function getContent(){
		return $this->content;
	}
	
	public function emptyCache(){
		if ($handle=opendir($this->cacheDir)) {
			while(false!==($file=readdir($handle))){
				if ($file!= "." && $file != "..")
					unlink($this->cacheDir.$file);
			}
			closedir($handle);
			return true;
		}
		else
			return false;
	}
	
	private function isFileOld(){
		if(file_exists($this->cacheDir.$this->urlCode)){
			$fileDate=date("Y-m-d",filemtime($this->cacheDir.$this->urlCode));
			$date = new DateTime($fileDate);
			$date->modify("+".$this->cacheDays." day");
			if(date("Ymd")>=$date->format("Ymd"))
				return true;
			else
				return false;
		}
		else
			return true;
	}
	
	private function getFromUrl(){
		$this->content=file_get_contents($this->url);
	}
	
	private function getFromFile(){
		$this->content=file_get_contents($this->cacheDir.$this->urlCode);
	}
	
	private function saveFile(){
		file_put_contents($this->cacheDir.$this->urlCode,$this->content);
		if(is_file($this->cacheDir.$this->urlCode))
			chmod($this->cacheDir.$this->urlCode, 0666);
	}
}
?>