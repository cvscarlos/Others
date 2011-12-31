<?php
/*
* @author: Carlos Vinicius
* @version 1.4 2011-12-31
*
* This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license,
* visit http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
*
* @Description: Classe para criar cache de arquivos através da URL dos mesmos e utilizar esta cache durante um período de dias pré estipulado
*
* @usage:   $cache=new CacheUrl("http://www.google.com"); // Definindo a URL
* @usage:   $cache->setLoginParams(array("username"=>"carlos","password"=>"senha123")); // [Opcional] caso seja necessário autenticação
* @usage:   $cache->exec();
* @usage:   echo $cache->getContent(); // saída
*
* @alert: Not support get content of URL after # | Não pega nada depois do # caso ele exista na URL
*/

class CacheUrl
{
	private $cacheDir; //Diretório onde os arquivos vão ser armazenados
	private $cacheDays; //Número de dias em que o arquivo vai permanecer em cache
	private $loginUrl; //Número de dias em que o arquivo vai permanecer em cache
	private $urlCode;
	private $url;
	private $content;
	private $postFields;
	private $authenticate;
    

	public function __construct($url)
    {
        // Opções / Configurações
        $this->cacheDir="cache_url/"; // Diretório onde vai ser salvo as cópias das páginas
        $this->cacheDays=1;
        $this->loginUrl="http://www.exemple.com/auth"; // Opcional
        // -------------------------------------

        $this->url($url);
        $this->authenticate=false;
        $this->urlCode=md5(urlencode($this->url));
    }
    
	public function exec()
    {
		if(file_exists($this->cacheDir.$this->urlCode) && !$this->isFileOld())
			$this->getFromFile();
		else
        {
			$this->getFromUrl();
			$this->saveFile();
		}
		$this->isFileOld();
	}
	
	public function getContent()
    {
		return $this->content;
	}
    
	public function emptyCache()
    {
		if ($handle=opendir($this->cacheDir))
        {
			while(false!==($file=readdir($handle)))
            {
				if ($file!= "." && $file != "..")
					unlink($this->cacheDir.$file);
			}
			closedir($handle);
			return true;
		}
		else
			return false;
	}
    
    public function setLoginParams($arrayParams)
    {
        $tmp=array();
        foreach($arrayParams as $k=>$v)
            $tmp[]="$k=$v";
        $this->postFields=implode("&",$tmp);
        $this->authenticate=true;
    }
    
    private function addPostParams($urlParam="",$postParams)
    {
        $url=$urlParam;
        if(is_array($postParams))
            if(strpos($urlParam,"?")===false)
                $url=sprintf("%s?%s",$urlParam,implode("&",$postParams));
            else
                $url=sprintf("%s&%s",$urlParam,implode("&",$postParams));
        return $url;
    }

    private function explodePost($key, $value){
        $item=array();
        foreach($value as $k=>$v)
        {
            if(is_array($v))
                $item[]=$this->explodePost($key."[$k]", $v);
            else
                $item[]=$key."[$k]=".$v;
        }
        $url=implode("&",$item);
        return $url;
    }

    private function getPostParams()
    {
        if(!empty($_POST))
        {
            $postParams=array();
            foreach($_POST as $k=>$v)
            {
                if(is_array($v))
                    $postParams[]=$this->explodePost($k,$v);
                else
                    $postParams[]="$k=$v";
            }
        }
        else
            $postParams="";
            
        return $postParams;
    }

    private function url($urlParam)
    {
        // Adicionando os parâmetros passados por POST a URL (como se fossem GET)
        if(!empty($_POST))
        {
            $postParams=$this->getPostParams();
            
            if(strpos($urlParam,"#")===false)
                $url=$this->addPostParams($urlParam,$postParams);
            else
            {
                $tmp=explode("#",$urlParam);
                $url=$this->addPostParams($tmp[0],$postParams);
                unset($tmp[0]);
                $url.="#".implode("#",$tmp);
            }
        }
        else
            $url=$urlParam;

        $this->url=$url;
    }
	
	private function isFileOld()
    {
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
	
	private function getFromUrl()
    {
        if(!function_exists('curl_init'))
            $this->content=file_get_contents($this->url);
        else
        {
            $ch = curl_init();
            if($this->authenticate)
            {
                // Define a URL original (do formulário de login)
                curl_setopt($ch, CURLOPT_URL, $this->loginUrl);
                // Habilita o protocolo POST
                curl_setopt ($ch, CURLOPT_POST, 1);
                // Define os parâmetros que serão enviados (usuário e senha por exemplo)
                curl_setopt ($ch, CURLOPT_POSTFIELDS, $this->postFields);
                // Imita o comportamento patrão dos navegadores: manipular cookies
                curl_setopt ($ch, CURLOPT_COOKIEJAR, 'cookie.txt');
                // Define o tipo de transferência (Padrão: 1)
                curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
                // Executa a requisição
                curl_exec ($ch);
            }
            // informar URL e outras funções ao CURL
            curl_setopt($ch, CURLOPT_URL, $this->url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, str_replace("?","",$this->addPostParams("",$this->getPostParams())));
            // Acessar a URL e retornar a saída
            $output = curl_exec($ch);
            // liberar
            curl_close($ch);
            
            $this->content=$output;
        }
	}
	
	private function getFromFile()
    {
		$this->content=file_get_contents($this->cacheDir.$this->urlCode);
	}
	
	private function saveFile()
    {
		file_put_contents($this->cacheDir.$this->urlCode,$this->content);
		if(is_file($this->cacheDir.$this->urlCode))
			chmod($this->cacheDir.$this->urlCode, 0666);
	}
}
?>