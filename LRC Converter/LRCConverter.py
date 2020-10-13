import sys

def read_file(content, name):
    try:
        with open(name + '.txt') as fr:
            for line in fr:
                content.append(line)
    except Error as e:
        print(e)

def parse_contents(content):
    result = []
    for line in content:
        line = line.replace(line[6:9], "")
        line = line.replace('[', '"')
        line = line.replace(']', '": "')
        line = line.replace('\n', '",')
        result.append(line)
    return result
        
def output_as_json(content, name):
    try:
        with open(name + '.json', 'w') as fw:
            fw.write('{')
            for line in content:
                fw.write(line)
            fw.write('}')
    except Error as e:
        print(e)

def main(argv):
    filename = sys.argv[1]
    content = []
    read_file(content, filename)
    content = parse_contents(content)
    output_as_json(content, filename)

if __name__ == '__main__':
    main(sys.argv)