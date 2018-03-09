### Scripts for indexing genomic data in Elastic search ###

#### Dependencies ####

- elasticsearch >= 2.0
- python = 2.7
  - elasticsearch >= 2.0
  - prettytable
  - PyIntervalTree
  - PyVCF >= 0.6.7
  - PyYAML
- python-virtualenv

#### Setup ####

- Initializing an isolated Python environment

        virtualenv ~/pythonenv

    switch to the above created environment

        source ~/pythonenv/bin/activate

    install the required dependencies

        pip install -r pip-requires.txt

- Populating the reference sample index

  - The indexing scripts, as well as the Web-visualization application, make use of curated reference sample data indexed under 'sample_index'. The current list of samples is stored in file resources/sample_index.txt in the repository, a TAB delimited file in the format shown below:

        sample_id	library_id	normal_sample_id	normal_library_id	expt_type	tumor_type	tumor_type_abbrev	project

  - To add the data to the sample index, execute the command below (assuming that the scripts are run on the system where Elastic search is being hosted):

        python <ES_LOADING_REPO_DIR>/elasticsearchloader/sample_index_loader.py -i <ES_LOADING_REPO_DIR>/resources/sample_index.txt

  - Alternatively, to index the data on a remote Elastic search host:

        python <ES_LOADING_REPO_DIR>/elasticsearchloader/sample_index_loader.py -i <ES_LOADING_REPO_DIR>/resources/sample_index.txt -H <es_host>

  - To verify that the data has been successfully indexed, point the browser to:

        http://<elastic_search_host>:9200/sample_index/_search?pretty=1

    or execute:

        curl http://<elastic_search_host>:9200/sample_index/_search?pretty=1

    which should list the first 10 records of the newly created index.

    NOTE: subsequent re-runs of script sample_index_loader.py will overwrite any existing data in the index.

- Populating the Gene annotations reference index

  - generate an index configuration YAML file, i.e. gene_annotations.yaml,  with the following content (configuration YAML files are discussed in more detail under section 'Usage'):

        __PIPELINE_INFO__:
          data_type: generic
        __HEADER__:
          caller: gene_annotations

  - download and extract the input file from [this link](http://ftp.ensembl.org/pub/release-66/gtf/homo_sapiens/Homo_sapiens.GRCh37.66.gtf.gz "Gene Annotations"), then execute:

        Python <ES_LOADING_REPO_DIR>/elasticsearchloader/es_import_file.py -x gene_annotations -d reference_type -y gene_annotations.yaml\
				-i Homo_sapiens.GRCh37.66.gtf --skip-denormalize [-H <es_host>]

  - verify that the that has been successfully indexed:

        http://<elastic_search_host>:9200/gene_annotations/_search?pretty=1

    or:

        curl http://<elastic_search_host>:9200/gene_annotations/_search?pretty=1



#### Usage ####

- Command line parameters

      usage: es_import_file.py [-h] [-i INFILE] [-x INDEX_NAME] [-d DOCTYPE]
                               [-H HOST] [-p PORT] [-y CONFIG_FILE]
                               [-v {info,debug,warn,error}] [--skip-denormalize]

      optional arguments:
        -h, --help            show this help message and exit
        -i INFILE, --infile INFILE
                              An analysis results file os a supported data
                              type/format
        -x INDEX_NAME, --index INDEX_NAME
                                name of index to create and load into
        -d DOCTYPE, --doc_type DOCTYPE
                                name of document types to make
        -H HOST, --host HOST  elastic search host. Default is localhost
        -p PORT, --port PORT  Elastic search port, default is 9200
        -y CONFIG_FILE, --config_file CONFIG_FILE
                              Configuration file in Yaml format
        -v {info,debug,warn,error}, --verbosity {info,debug,warn,error}
                              Default level of verbosity is INFO.
        --skip-denormalize    If set, indexed data is not denormalized
	--skip-denormalize    If set, indexed data is not denormalized
	--use-ssl             Connect over SSL
	-u USERNAME, --username USERNAME
	                      Username
	-P PASSWORD, --password PASSWORD
		              Password



- Configuration file examples

  Currently the main indexing script accepts a configuration file in YAML format as one of the parameters (supplied with option **-y** or **--config_file** ), the file serves to provide information as to which data type specific indexing script should be used, as well as specific tumour/normal sample/library information and/or other meta data.

  This data is used to annotate each record from the analysis results input file (provided with parameter **-i** or **--infile**). Below is the minimal information that should be supplied in such YAML files:

            __PIPELINE_INFO__:
              data_type: generic
            __HEADER__:
              caller: <DATA TYPE, i.e. mutationseq, titan, destruct, etc..>
              sample_id: <SAMPLE ID>
              library_id: <LIBRARY ID>
              normal_sample_id: <NORMAL SAMPLE ID>
              normal_library_id: <NORMAL LIBRARY ID>

  In order to properly annotate each record, the combination of sample_id/library_id/normal_sample_id/normal_library_id values should correspond to a unique record in the sample_index (discussed above).

  These sample specific values are further used to query the reference sample index for additional information - project, experiment type, tumour type - which is also appended to each record and provides essential criteria for grouping data in the visualization front end.

  **Data type specific examples**

  - mutationseq

        __PIPELINE_INFO__:
          data_type: generic
        __HEADER__:
          caller: mutationseq
          sample_id: <SAMPLE ID>
          library_id: <LIBRARY ID>
          normal_sample_id: <NORMAL SAMPLE ID>
          normal_library_id: <NORMAL LIBRARY ID>
          normal_bam: <PATH_TO_NORMAL_BAM_FILE>
          tumor_bam: <PATH_TO_TUMOUR_BAM_FILE>
          build: GRCh37
          component_name: run_mutationseq
          component_version: 1.0.8
          dbsnp_version: 'dbSNP138'
          ensemble_release: GRCh37.66
          model_version: model_v4.1.2_anaconda_sk_0.13.1.npz
          normal_library_id: DG1155N
          normal_sample_id: DG1155N
          run_id: '20151124110800'
          seed_version: NA
          snpeff_version: '3.6'
          threshold: 0.5

  - mutationseq-ss

        __PIPELINE_INFO__:
          data_type: generic
        __HEADER__:
          caller: mutationseq-ss
          sample_id: <SAMPLE ID>
          library_id: <LIBRARY ID>
          normal_sample_id: ''
          normal_library_id: ''
          normal_bam: ''
          tumor_bam: <PATH_TO_TUMOUR_BAM_FILE>
          build: GRCh37
          component_name: run_mutationseq
          component_version: 1.0.8
          dbsnp_version: 'dbSNP138'
          ensemble_release: GRCh37.66
          model_version: model_v4.1.2_anaconda_sk_0.13.1.npz
          normal_library_id: DG1155N
          normal_sample_id: DG1155N
          run_id: '20151124110800'
          seed_version: NA
          snpeff_version: '3.6'
          threshold: 0.5

  - titan

        __PIPELINE_INFO__:
          data_type: generic
        __HEADER__:
          caller: titan
          sample_id: <SAMPLE ID>
          library_id: <LIBRARY ID>
          normal_sample_id: <NORMAL SAMPLE ID>
          normal_library_id: <NORMAL LIBRARY ID>
          build: GRCh37
          component_name: annot_pygenes
          component_version: 1.1.5
          dbsnp_version: dbSNP138
          number_clusters: 1
          ploidy: 2
          run_id: '20160203113429'
          seed_version: 1.0.2

  - destruct

        __PIPELINE_INFO__:
          data_type: generic
        __HEADER__:
          caller: destruct
          sample_id: <SAMPLE ID>
          library_id: <LIBRARY ID>
          normal_sample_id: <NORMAL SAMPLE ID>
          normal_library_id: <NORMAL LIBRARY ID>
          component_name: run_destruct_demix
          component_version: 1.1.0
          run_id: '20151124110621'
          seed_version: 0.0.4

    NOTE: Data can be indexed using only the minimal set of YAML file parameters, however including more detailed information could provide useful filtering options later in the visualization front end.

    NOTE: In order for numeric types to be treated as strings in Elastic search, such values should be surrounded by quotation marks, e.g run_id, snpeff_version above. This is helps avoiding mapping errors in cases where different values for a specific field are expected to be of varying types across records.

    NOTE: Currently there are a couple of generalized scripts for indexing data in CSV/TSV and VCF format, to use either one in place of the data type specific ones parameter **file_format** has to also be set, e.g.:

        __PIPELINE_INFO__:
          data_type: generic
        __HEADER__:
          caller: mutationseq
          file_format: vcf
          sample_id: <SAMPLE ID>
          library_id: <LIBRARY ID>
          ...

    or

        __PIPELINE_INFO__:
          data_type: generic
        __HEADER__:
          caller: titan
          file_format: csv
          sample_id: <SAMPLE ID>
          library_id: <LIBRARY ID>
          ...

- Grouping data based on patient ID

    Normally data is indexed on per sample_id basis, i.e. data from each sample id is stored in a separate index. Data from multiple samples can be grouped under the same index based on common patient ID however. To do so update the configuration YAML file to include field **patient_id**, e.g:

        __PIPELINE_INFO__:
          data_type: generic
        __HEADER__:
          caller: <DATA_TYPE>
          sample_id: <SAMPLE ID>
          library_id: <LIBRARY ID>
          patient_id: <PATIENT_ID>
          ...

    Then also run the indexing script as follows (PATIENT_ID is not a placeholder, it specifies that an index named after the patient ID should be used and should be typed as is ):

        python elasticsearchloader/es_import_file.py --config_file <path_to_a_yaml_config_file> --infile <path_to_an_analysis_results_file> --index PATIENT_ID

    or

        python elasticsearchloader/es_import_file.py -y <path_to_a_yaml_config_file> -i <path_to_an_analysis_results_file> -x PATIENT_ID


- Required data fields

    In order to function correctly, the front end needs a minimal set of fields to be present in the indexed data (fields marked with * are optional, if such data is present in data being indexed, it should be named as listed below though):

    - sample_id (string)
    - chrom_number (string, single digit chromosomes should be prepended with 0, i.e. chromosome 1 should be indexed as "01")
    - start (integer)
    - end (integer)
    - caller (string)
    - gene_name (string)
    - strand* (string)
    - patient_id* (string)
    - tumor_type* (string)
    - expt_type* (string)
    - project* (string)
    - events* (nested structure)

    NOTE: **events** field is populated during the data denormalization phase, in case indexed data itself contains field with the same name, it should be renamed.


- Run examples:

        python elasticsearchloader/es_import_file.py --config_file <path_to_a_yaml_config_file> --infile <path_to_an_analysis_results_file>

        python elasticsearchloader/es_import_file.py --y <path_to_a_yaml_config_file> --i <path_to_an_analysis_results_file>

    The index name, document type and Elastic search host can also be specified:

        python elasticsearchloader/es_import_file.py -y <yaml_config_file> -i <analysis_results_file> -x <index> -d <doc_type> --H <es_host>


- Output examples

    Currently the output is excessively verbose, the information of importance however is the status of the initial indexing phase, found in a table in the format shown below:

        INFO: File import results:
        +-----------------------+------------------------------------------------------------------------------------------------------+
        | Field                 | Value                                                                                                |
        +-----------------------+------------------------------------------------------------------------------------------------------+
        | index                 | index_name (usually it is the same as the sample/patient ID when default parameters are used)        |
        | record_count          | 12345                                                                                                |
        | log                   | All records have been imported.                                                                      |
        | imported_record_count | 12345                                                                                                |
        | timestamp             | 2016-02-23 09:41:16.429413                                                                           |
        | file_fullname         | /path_to_the_input_analysis_results_file                                                             |
        | doc_type              | 20160223094008                                                                                       |
        | validated             | True                                                                                                 |
        +-----------------------+------------------------------------------------------------------------------------------------------+

    as well as the result of the denormalization phase, which is usually addressed in the last log line:

        INFO: All records have been denormalized.

    It's worth noting that the number reported by record_count (in the table above) could differ from the one under imported_record_count or the number of non-comment lines in the original input file, even though the process has been validated. This is an expected behaviour as some records from the input file are omitted either due to having non-standard chromosomes or because of certain applied filtering criteria.


- Deleting indexed data

    To remove the data associated with a specific sample/patient, the corresponding index should be deleted, this can be easily done using curl:

        curl -XDELETE http://<es_host>:9200/<index_name>

    e.g. to delete index test_index on a locally hosted instance of Elastic search:

        curl -XDELETE http://localhost:9200/test_index
