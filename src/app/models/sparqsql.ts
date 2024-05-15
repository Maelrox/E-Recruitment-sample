export const SPARQL_QUERY_GET_OCCUPATIONS = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ont: <https://iush.edu.co/rfd/ontologies/it/ontology#>

SELECT ?occupation
WHERE {
  ?occupation rdf:type ont:Occupation .
}
ORDER BY ?occupation
`;

export const SPARQL_QUERY_GET_ESSENTIAL_SKILLS_BY_OCCUPATION = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ont: <https://iush.edu.co/rfd/ontologies/it/ontology#>

SELECT ?skill
WHERE {
  ont:{{occupation}} ont:essentialSkillFor ?skill .
}
`;

export const SPARQL_QUERY_GET_NON_ESSENTIAL_SKILLS_BY_OCCUPATION = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ont: <https://iush.edu.co/rfd/ontologies/it/ontology#>

SELECT ?optionalSkill
WHERE {
  ont:{{occupation}} rdf:type ont:Occupation .
  ont:{{occupation}} ont:optionalSkillFor ?optionalSkill .
}
`;

export const SPARQL_QUERY_GET_ESSENTIAL_QUALIFICATIONS_BY_OCCUPATION = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ont: <https://iush.edu.co/rfd/ontologies/it/ontology#>

SELECT ?requiresQualification
WHERE {
  ont:{{occupation}} rdf:type ont:Occupation .
  ont:{{occupation}} ont:requiresQualification ?requiresQualification .
}
`;

export const SPARQL_QUERY_GET_NON_ESSENTIAL_QUALIFICATIONS_BY_OCCUPATION = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ont: <https://iush.edu.co/rfd/ontologies/it/ontology#>

SELECT ?optionalQualification
WHERE {
  ont:{{occupation}} rdf:type ont:Occupation .
  ont:{{occupation}} ont:optionalQualification ?optionalQualification .
}
`;

export const SPARQL_QUERY_GET_WORK_CONTEXT_BY_OCCUPATION = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ont: <https://iush.edu.co/rfd/ontologies/it/ontology#>

SELECT ?hasWorkContext
WHERE {
  ont:{{occupation}} rdf:type ont:Occupation .
  ont:{{occupation}} ont:hasWorkContext ?hasWorkContext .
}
`;

export const SPARQL_QUERY_GET_OCCUPATION_BY_ALTERNATIVE_LABEL = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ont: <https://iush.edu.co/rfd/ontologies/it/ontology#>

SELECT ?individual
WHERE {
  ?individual rdf:type ont:Occupation .
  ?individual ont:alternativeLabel ?label .
  FILTER(CONTAINS(LCASE(?label), "{{alternativeLabel}}"))
}
`;

export const SPARQL_QUERY_GET_ISCED_BY_OCCUPATION = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX it: <https://iush.edu.co/rfd/ontologies/it/ontology#>

SELECT ?iscdLabel WHERE {
  it:{{occupation}} it:taggedByISCED ?iscdNode .
  ?iscdNode rdf:label ?iscdLabel .
}
`;

export const SPARQL_QUERY_GET_RELATED_SKILLS_BY_SKILL = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ont: <https://iush.edu.co/rfd/ontologies/it/ontology#>

SELECT DISTINCT ?essentialSkillFor WHERE {
  ?occupation rdf:type ont:Occupation .
  
  {
    SELECT ?occupation WHERE {
      ?occupation ont:essentialSkillFor ?skill .
      FILTER (CONTAINS(LCASE(STR(?skill)), "{{skill}}"))
    } GROUP BY ?occupation
  }
  
  ?occupation ont:essentialSkillFor ?essentialSkillFor .
}
`;

export const SPARQL_QUERY_GET_RELATED_OCCUPATIONS_BY_SKILL = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ont: <https://iush.edu.co/rfd/ontologies/it/ontology#>

SELECT DISTINCT ?occupation WHERE {
  ?occupation rdf:type ont:Occupation .
  
  {
    SELECT ?occupation WHERE {
      ?occupation ont:essentialSkillFor ?skill .
      FILTER (CONTAINS(LCASE(STR(?skill)), "{{skill}}"))
    } GROUP BY ?occupation
  }
  
  ?occupation ont:essentialSkillFor ?essentialSkillFor .
}
`;