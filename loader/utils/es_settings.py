'''
Created on September, 2014

@author: dmachev
'''

# Elastic search server connection settings used in tests
ES_CONFIG = {
    'host': 'localhost',
    'port': 9200,
    'index': 'test_index',
    'doc_type': 'event_type'
}

# Input file header fields to Elastic search record fields mappings, the ones
# under 'common' are shared among all data types. 'transform' specified
# whether the data will need to be modified in any way prior to import
REFERENCE_INDEX = 'sample_index'

YAML_INDEX = 'yaml_index'

GENE_ANNOTATIONS_INDEX = 'gene_annotations'

YAML_DOCTYPE = 'config_type'

DENORMALIZED_ALIAS = 'denormalized_data'

HEADER_FIELDS = {
    'common': {
        'build': {'field': 'build', 'transform': 'lower'},
        'caller': {'field': 'caller', 'transform': 'lower'},
        'expt_type': {'field': 'expt_type', 'transform': 'lower'},
        'LIBRARY_ID': {'field': 'library_id', 'transform': 'none'},
        'NORMAL_LIBRARY_ID': {
            'field': 'normal_library_id', 'transform': 'none'
        },
        'NORMAL_SAMPLE_ID': {'field': 'normal_sample_id', 'transform': 'none'},
        'RUN_ID': {'field': 'run_id', 'transform': 'none'},
        'SAMPLE_ID': {'field': 'sample_id', 'transform': 'none'},
        'tumour_type': {'field': 'tumor_type_fullname', 'transform': 'lower'},
        'tumour_type_abbrev': {'field': 'tumor_type', 'transform': 'lower'},
        'variant_type': {'field': 'variant_type', 'transform': 'lower'},
        'FILE_DATE': {'field': 'file_date', 'transform': 'time'},
        'CONFIG_FILE': {'field': 'CONFIG_FILE', 'transform': 'remove'}
    },
    'MuseqAnalysisLoader': {
        'VERSION': {'field': 'version', 'transform': 'none'},
        'fileformat': {'field': 'file_format', 'transform': 'none'},
        'tumour': {'field': 'tumor_bam', 'transform': 'none'},
        'normal': {'field': 'normal_bam', 'transform': 'none'},
        'threshold': {'field': 'threshold', 'transform': 'number'},
        'FILTER': {'field': 'FILTER', 'transform': 'none'},
        'reference': {'field': 'reference', 'transform': 'none'},
        'model': {'field': 'model', 'transform': 'none'},
    },
    'StrelkaAnalysisLoader': {
        'fileformat': {'field': 'file_format', 'transform': 'none'},
        'reference': {'field': 'reference', 'transform': 'none'},
        'source': {'field': 'source', 'transform': 'none'},
        'source_version': {'field': 'source_version', 'transform': 'none'},
        'startTime': {'field': 'start_time', 'transform': 'time'},
        'germlineIndelTheta': {
            'field': 'germline_indel_theta', 'transform': 'number'
        },
        'germlineSnvTheta': {
            'field': 'germline_snv_theta', 'transform': 'number'
        },
        'priorSomaticIndelRate': {
            'field': 'prior_somatic_indel_rate', 'transform': 'none'
        },
        'content': {'field': 'content', 'transform': 'none'}
    }
}

# The structure below describes the location of the sought after attribute
# within the Yaml configuration file, i.e. the below listed configuration
# shows that sample_id will be listed under '__SAMPLE__', the * indicates
# that there might be multiple fields of interest and each of them should
# contain a field 'tumour'. Dictionary structures within the field list
# usually indicate that the exact task positions is not known, however
# is identifiable by the provided key(s)/value(s) attribute(s)

YAML_FIELDS = {
    'common': {
        'caller': ['__PIPELINE_INFO__', 'data_type'],
        'sample_id': ['__SAMPLES__', '*', 'tumour_id'],
        'library_id': ['__SAMPLES__', '*', 'tumour_library_id'],
        'normal_sample_id': ['__SAMPLES__', '*', 'normal_id'],
        'normal_library_id': ['__SAMPLES__', '*', 'normal_library_id'],
    },
    'destruct': {
        'component_name': [
            {'component_name': 'run_destruct_demix'},
            'reserved', 'component_name'
        ],
        'component_version': [
            {'component_name': 'run_destruct_demix'},
            'reserved', 'component_version'
        ],
        'seed_version': [
            {'component_name': 'run_destruct_demix'},
            'reserved', 'seed_version'
        ],
        'build': [
            {'component_name': 'run_destruct_demix'},
            'component', 'input_files', 'reference', r'^.*\/(.*?)[-|\.].*$'
        ]
    },
    'mutationseq': {
        'component_name': [
            {'component_name': 'run_mutationseq'}, 'reserved', 'component_name'
        ],
        'component_version': [
            {'component_name': 'run_mutationseq'},
            'reserved', 'component_version'
        ],
        'seed_version': [
            {'component_name': 'run_mutationseq'},
            'reserved', 'seed_version'
        ],
        'build': [
            {'component_name': 'run_mutationseq'},
            'component', 'input_files', 'reference', r'^.*\/(.*?)[-|\.].*$'
        ],
        'model_version': [
            {'component_name': 'run_mutationseq'},
            'component', 'input_files', 'model'
        ],
        'threshold': [
            {'component_name': 'run_mutationseq'},
            'component', 'parameters', 'threshold'
        ],
        'ensemble_release': [
            {'component_name': 'run_snpeff'},
            'component', 'parameters', 'genome_version'
        ],
        'snpeff_version': [
            {'component_name': 'run_snpeff'},
            'reserved', 'seed_version', r'^.*(\d+\.\d+).*$'
        ],
        'dbsnp_version': [
            {'component_name': 'flag_positions_vcf', 'string': 'DBSNP'},
            'component', 'input_files', 'db', r'^.*[\/|_](.*?)\..*$'
        ],
        'tumor_bam': ['__SAMPLES__', '*', 'tumour'],
        'normal_bam': ['__SAMPLES__', '*', 'normal'],
    },
    'strelka': {
        'component_name': [
            {'component_name': 'run_strelka'}, 'reserved', 'component_name'
        ],
        'component_version': [
            {'component_name': 'run_strelka'},
            'reserved', 'component_version'
        ],
        'seed_version': [
            {'component_name': 'run_strelka'},
            'reserved', 'seed_version'
        ],
        'build': [
            {'component_name': 'run_strelka'},
            'component', 'input_files', 'reference', r'^.*\/(.*?)[-|\.].*$'
        ],
        'snpeff_version': [
            {'component_name': 'run_snpeff'},
            'reserved', 'seed_version', r'^.*(\d+\.\d+).*$'
        ],
        'dbsnp_version': [
            {'component_name': 'flag_positions_vcf', 'string': 'DBSNP'},
            'component', 'input_files', 'db', r'^.*[\/|_](.*?)\..*$'
        ],
    },
    'titan': {
        'component_name': [
            {'component_name': 'annot_pygenes'},
            'reserved', 'component_name'
        ],
        'dbsnp_version': [
            {'component_name': 'convert_museq_vcf2counts'},
            'component', 'input_files', 'positions_file', r'^.*[\/|_](.*?)\..*$'
        ],
        'component_version': [
            {'component_name': 'annot_pygenes'},
            'reserved', 'component_version'
        ],
        'seed_version': [
            {'component_name': 'annot_pygenes'},
            'reserved', 'seed_version'
        ],
        'build': [
            {'component_name': 'run_titan', 'use_cluster': True},
            'component', 'input_files', 'map', r'^.*\/(.*?)[-|\.].*$'
        ],
        'ploidy': [
            {'component_name': 'run_titan', 'use_cluster': True},
            'component', 'parameters', 'ploidy', 'integer'
        ],
        'number_clusters': [
            {'component_name': 'run_titan', 'use_cluster': True},
            'component', 'parameters', 'num_clusters', 'integer'
        ],
    },
    'titan_support': {
        'component_name': [
            {'component_name': 'run_titan'}, 'reserved', 'component_name'
        ],
        'dbsnp_version': [
            {'component_name': 'run_mutationseq'},
            'component', 'input_files', 'positions_file', r'^.*[\/|_](.*?)\..*$'
        ],
        'component_version': [
            {'component_name': 'run_titan'},
            'reserved', 'component_version'
        ],
        'seed_version': [
            {'component_name': 'run_titan'},
            'reserved', 'seed_version'
        ],
        'build': [
            {'component_name': 'run_titan', 'use_cluster': True},
            'component', 'input_files', 'map', r'^.*\/(.*?)[-|\.].*$'
        ],
        'ploidy': [
            {'component_name': 'run_titan', 'use_cluster': True},
            'component', 'parameters', 'ploidy', 'integer'
        ],
        'number_clusters': [
            {'component_name': 'run_titan', 'use_cluster': True},
            'component', 'parameters', 'num_clusters', 'integer'
        ],
    },
    'generic': {'expand': ['__HEADER__']}
}

YAML_FIELDS['mutationseq-ss'] = YAML_FIELDS['mutationseq']

SNPEFF = {
    '3.0': [
        'Effect_Impact', 'Functional_Class', 'Codon_Change',
        'Amino_Acid_change', 'Amino_Acid_length', 'Gene_Name',
        'Gene_BioType', 'Coding', 'Transcript', 'Exon', 'ERRORS', 'WARNINGS'
    ],
    '3.5': [
        'Effect_Impact', 'Functional_Class', 'Codon_Change',
        'Amino_Acid_change', 'Gene_Name', 'Transcript_BioType',
        'Gene_Coding', 'Transcript_ID', 'Exon', 'ERRORS', 'WARNINGS'
    ],
    '3.6': [
        'Effect_Impact', 'Functional_Class', 'Codon_Change',
        'Amino_Acid_Change', 'Amino_Acid_length', 'Gene_Name',
        'Transcript_BioType', 'Gene_Coding', 'Transcript_ID', 'Exon_Rank',
        'Genotype_Number', 'ERRORS', 'WARNINGS'
    ]
}

SNPEFF_MAPPINGS = {
    'Effect_Impact': 'SNPEffect_Impact',
    'Functional_Class': 'SNPeffFunctional_Class',
    'Codon_Change': 'SNPeffCodon_Change',
    'Amino_Acid_change': 'SNPeffAmino_Acid_Change',
    'Amino_Acid_Change': 'SNPeffAmino_Acid_Change',  # SnpEff v3.6
    'Amino_Acid_length': 'SNPeffAmino_Acid_Length',  # SnpEff v3.0 and v3.6
    'Gene_Name': 'SNPeffGene_Name',
    'Gene_BioType': 'SNPeffTranscript_BioType',  # SnpEff v3.0
    'Transcript_BioType': 'SNPeffTranscript_BioType',  # SnpEff v3.5 and v3.6
    'Coding': 'SNPeffGene_Coding',  # SnpEff v3.0
    'Gene_Coding': 'SNPeffGene_Coding',  # SnpEff v3.5 and v3.6
    'Transcript': 'SNPeffTranscript_ID',  # SnpEff v3.0
    'Transcript_ID': 'SNPeffTranscript_ID',  # SnpEff v3.5 and v3.6
    'Exon': 'SNPeffExon',
    'Exon_Rank': 'SNPeffExon',  # SnpEff v3.6
    'Genotype_Number': 'SNPeffGenotype_Number',  # SnpEff v3.6
    'ERRORS': 'SNPeffErrors',
    'WARNINGS': 'SNPeffWarnings'
}

DB_SETTINGS = {
    'host': 'localhost',
    'db': 'pipeline_results_files',
    'user': 'pipeline_dev',
    'passwd': 'pipeline_pass'
}

DB_DATA = {
    'table': 'results_files',
    'yaml_loaded': 'config_loaded_to_elasticsearch',
    'results_loaded': 'results_loaded_to_elasticsearch',
    'data_denormalized': 'denormalized'
}
